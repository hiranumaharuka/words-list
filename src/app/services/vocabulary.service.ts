import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import {
  Vocabulary,
  VocabularyWithAuthor,
  User
} from '../interfaces/vocabulary';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  constructor(
    // データベースにアクセスする
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  addVocabulary(
    vocabulary: Omit<Vocabulary, 'vocabularyId' | 'likedCount'>,
    uid: string
  ): Promise<void> {
    // createIdは元からfirebaseの中で定義されている
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
      });
  }

  getVocabulary(vocabularyId: string): Observable<Vocabulary> {
    return this.db
      .doc<Vocabulary>(`vocabularies/${vocabularyId}`)
      .valueChanges();
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
    return sorted.snapshotChanges().pipe(
      map(snaps => snaps.map(snap => snap.payload.doc)),
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
          vocabulariesData,
          lastDoc
        };
      })
    );
  }
  getMyVocabularies(
    authorId: string,
    startAfter?: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ) {
    const sorted = this.db.collection<Vocabulary>(`vocabularies`, ref => {
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
    });
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
  // 自分がいいねしたアイテムを取得
  // getMyLikedItems(userId: string): Observable<VocabularyWithAuthor[]> {
  //   const sorted = this.db
  //     // いいねした記事のID一覧を取得
  //     .collection<Vocabulary>(`users/${userId}/likedVocabularies`)
  //     .valueChanges().pipe(
  //       switchMap(
  //         vocabularies => {
  //           return combineLatest(
  //             vocabularies.map((vocabulary: Vocabulary) =>
  //               // Vocabularyだけ
  //               this.db.doc(`vocabularies/${vocabulary.vocabularyId}`).valueChanges())
  //           );
  //         }
  //       )
  //     );
  //   // いいねした記事の本体を取得したい（本体がVocabularyとUserを合体したもの）
  //   return this.getVocabularies(sorted).pipe(
  //     map((result: {
  //       lastDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  //       vocabulariesData: VocabularyWithAuthor[];
  //     }) => {
  //       return result.vocabulariesData;
  //     })
  //   );
  // }
}
