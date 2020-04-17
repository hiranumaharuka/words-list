import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import {
  Vocabulary,
  VocabularyWithAuthor,
  User
} from '../interfaces/vocabulary';
import { Router } from '@angular/router';
import { map, switchMap, first, tap } from 'rxjs/operators';
import { Observable, combineLatest, of, Subject } from 'rxjs';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material';
import { AngularFireFunctions } from '@angular/fire/functions';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private deleteVocabularyId = new Subject<string>();
  public deleteVocabularyId$ = this.deleteVocabularyId.asObservable();
  constructor(
    // データベースにアクセスする
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions,
    private loadingService: LoadingService
  ) {}

  addVocabulary(
    vocabulary: Omit<Vocabulary, 'vocabularyId' | 'likedCount'>,
    uid: string
  ): Promise<void> {
    this.loadingService.toggleLoading(true);
    const vocabularyId = this.db.createId();
    return this.db
      .doc(`vocabularies/${vocabularyId}`)
      .set({
        vocabularyId,
        ...vocabulary,
        likedCount: 0,
        authorId: uid
      })
      .then(() => {
        this.snackBar.open('単語帳を作成しました', null, { duration: 1500 });
        this.router.navigateByUrl('/myvocabulary');
        this.loadingService.toggleLoading(false);
      });
  }

  getVocabulary(vocabularyId: string): Observable<Vocabulary> {
    this.loadingService.toggleLoading(true);
    return this.db
      .doc<Vocabulary>(`vocabularies/${vocabularyId}`)
      .valueChanges()
      .pipe(
        tap(() => {
          this.loadingService.toggleLoading(false);
        })
      );
  }

  getUser(userId: string): Observable<User> {
    return this.db.doc<User>(`users/${userId}`).valueChanges();
  }

  getVocabularies(
    sorted: AngularFirestoreCollection<Vocabulary>
  ): Observable<{
    lastDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    vocabulariesData: VocabularyWithAuthor[];
  }> {
    let vocabularies: Vocabulary[];
    let lastDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    return sorted.get({ source: 'server' }).pipe(
      map(results => results.docs),
      switchMap(docs => {
        lastDoc = docs[docs.length - 1];
        // 最後にvocabuleryのデータを取ってくるため
        vocabularies = docs.map(doc => doc.data() as Vocabulary);
        if (vocabularies.length) {
          // 重複なしのauthorIdをとってくる
          const authorIds: string[] = vocabularies
            // 新verのvocabulariesをとってくる
            .filter((vocabulary, index, self) => {
              return (
                // 1ユーザー1vocabularyのvocabulariesを作る
                self.findIndex(
                  item => vocabulary.authorId === item.authorId
                ) === index
              );
            })
            // vocabularyをauthorIdだけにする
            .map(vocabulary => vocabulary.authorId);
          return combineLatest(
            authorIds.map(authorId => {
              return this.db.doc<User>(`users/${authorId}`).valueChanges();
            })
          );
        } else {
          return of([]);
        }
      }),
      map((users: User[]) => {
        const vocabulariesData = vocabularies.map(vocabulary => {
          const result: VocabularyWithAuthor = {
            ...vocabulary,
            author: users.find(user => user && user.id === vocabulary.authorId)
          };
          return result;
        });
        return {
          lastDoc,
          vocabulariesData
        };
      })
    );
  }

  getMyVocabularies(
    authorId: string,
    startAfter?: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ) {
    const sorted = this.db.collection<VocabularyWithAuthor>(
      `vocabularies`,
      ref => {
        // 作成日順に3件取得
        let query = ref
          .where('authorId', '==', authorId)
          .orderBy('createdAt', 'desc')
          .limit(3);
        // もし開始位置があればそれ以降を取得
        if (startAfter) {
          query = query.startAfter(startAfter);
        }
        // 開始位置がなければそのままかえす
        return query;
      }
    );
    return this.getVocabularies(sorted);
  }

  getLatestVocabularies(): Observable<VocabularyWithAuthor[]> {
    const sorted = this.db.collection<VocabularyWithAuthor>(
      `vocabularies`,
      ref => {
        return ref.orderBy('createdAt', 'desc').limit(5);
      }
    );
    return this.getVocabularies(sorted).pipe(
      map(result => {
        return result.vocabulariesData;
      })
    );
  }

  getPopularVocabularies(): Observable<VocabularyWithAuthor[]> {
    const sorted = this.db.collection<VocabularyWithAuthor>(
      `vocabularies`,
      ref => {
        return ref.orderBy('likedCount', 'desc').limit(5);
      }
    );
    return this.getVocabularies(sorted).pipe(
      map(result => {
        return result.vocabulariesData;
      })
    );
  }

  updateVocabulary(
    vocabulary: Omit<Vocabulary, 'createdAt' | 'likedCount'>
  ): Promise<void> {
    this.loadingService.toggleLoading(true);
    return this.db
      .doc(`vocabularies/${vocabulary.vocabularyId}`)
      .update({ ...vocabulary })
      .then(() => {
        this.snackBar.open('単語帳を編集しました', null, { duration: 1500 });
        this.loadingService.toggleLoading(false);
      });
  }

  deleteVocabulary(vocabularyId: string): Promise<void> {
    this.loadingService.toggleLoading(true);
    const deleteFn = this.fns.httpsCallable('recursiveDelete');
    return deleteFn({ vocabularyId })
      .pipe(first())
      .toPromise()
      .then(() => {
        this.snackBar.open('単語帳を削除しました', null, { duration: 1500 });
        this.loadingService.toggleLoading(false);
      })
      .catch(err => {
        console.log('Delete failed, see console,');
        console.warn(err);
      });
  }

  public getDeleteVocabularyId(deleteId: string) {
    this.deleteVocabularyId.next(deleteId);
  }

  getLikedVocabularies(
    userId: string,
    startAfter?: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ): Observable<{
    lastDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    vocabulariesData: VocabularyWithAuthor[];
  }> {
    let lastDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    const vocabularies$: Observable<Vocabulary[]> = this.db
      .collection(`users/${userId}/likedVocabularies`, ref => {
        let query = ref.orderBy('createdAt', 'desc').limit(3);
        if (startAfter) {
          query = query.startAfter(startAfter);
        }
        return query;
      })
      .get({ source: 'server' })
      .pipe(
        map(results => results.docs),
        switchMap(vocabularydocs => {
          lastDoc = vocabularydocs[vocabularydocs.length - 1];
          return combineLatest(
            vocabularydocs.map(doc => {
              const id = doc.data().vocabularyId;
              return this.db
                .doc<Vocabulary>(`vocabularies/${id}`)
                .valueChanges();
            })
          );
        })
      );

    const authors$: Observable<User[]> = vocabularies$.pipe(
      switchMap(vocabularies => {
        return combineLatest(
          vocabularies
            .filter((vocabulary, index, self) => {
              return (
                self.findIndex(
                  item => vocabulary.authorId === item.authorId
                ) === index
              );
            })
            .map(vocabulary => {
              return this.db
                .doc<User>(`users/${vocabulary.authorId}`)
                .valueChanges();
            })
        );
      })
    );

    return combineLatest([vocabularies$, authors$]).pipe(
      map(([vocabularies, authors]) => {
        const vocabulariesData = vocabularies.map((vocabulary, index) => {
          const result: VocabularyWithAuthor = {
            ...vocabulary,
            author: authors.find(author => author.id === vocabulary.authorId)
          };
          return result;
        });
        return {
          lastDoc,
          vocabulariesData
        };
      })
    );
  }
}
