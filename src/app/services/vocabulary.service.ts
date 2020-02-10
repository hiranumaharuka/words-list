import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import {
  Vocabulary,
  VocabularyWithAuthor,
  User
} from '../interfaces/vocabulary';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  constructor(
    // データベースにアクセスする
    private db: AngularFirestore,
    private router: Router
  ) {}

  addVocabulary(
    vocabulary: Omit<Vocabulary, 'vocabularyId'>,
    uid: string
  ): Promise<void> {
    // createIdは元からfirebaseの中で定義されている
    const vocabularyId = this.db.createId();
    return this.db
      .doc(`vocabularies/${vocabularyId}`)
      .set({
        vocabularyId,
        ...vocabulary,
        authorId: uid
      })
      .then(() => {
        this.router.navigateByUrl('/mypage');
      });
  }

  getVocabularies(authorId?: string): Observable<VocabularyWithAuthor[]> {
    let vocabularies: Vocabulary[];
    let vocabulariesRef = this.db.collection<Vocabulary>(`vocabularies`);
    if (authorId) {
      vocabulariesRef = this.db.collection<Vocabulary>(`vocabularies`, ref =>
        ref
          .where('authorId', '==', authorId)
          .orderBy('createdAt', 'desc')
          .limit(3)
      );
    }
    return this.db
      .collection<Vocabulary>(`vocabularies`, ref =>
        ref.orderBy('createdAt', 'desc').limit(3)
      )
      .valueChanges()
      .pipe(
        switchMap((docs: Vocabulary[]) => {
          // 単語帳一覧を一時保管しておく
          vocabularies = docs;
          if (vocabularies.length) {
            // ユニークな投稿者IDリストを作成
            const authorIds: string[] = vocabularies
              .filter((vocabulary, index, self) => {
                return (
                  self.findIndex(
                    item => vocabulary.authorId === item.authorId
                  ) === index
                );
              })
              .map(vocabulary => vocabulary.authorId);

            // 投稿者たちのドキュメントを取得
            return combineLatest(
              authorIds.map(uid => {
                return this.db.doc<User>(`users/${uid}`).valueChanges();
              })
            );
          } else {
            return of([]);
          }
        }),
        map((users: User[]) => {
          // 一時保管した記事一覧とユーザーを結合する
          return vocabularies.map(vocabulary => {
            const result: VocabularyWithAuthor = {
              ...vocabulary,
              author: users.find(
                user => user && user.id === vocabulary.authorId
              )
            };
            return result;
          });
        })
      );
  }

  // TODO: authorID使って絞り込み＆インデックス作成
  // TODO: VocabularyWithAuthor で返してあげる
  getMyVocabularies(
    authorId: string,
    startAfter?: QueryDocumentSnapshot<Vocabulary>
  ): Observable<{
    docs: VocabularyWithAuthor[];
    lastDoc: QueryDocumentSnapshot<Vocabulary>;
  }> {
    return this.db
      .collection<Vocabulary>(`vocabularies`, ref => {
        let query = ref.orderBy('createdAt').limit(3);
        if (startAfter) {
          query = query.startAfter(startAfter);
        }
        return query;
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return {
            docs: actions.map(doc => doc.payload.doc.data()),
            lastDoc: actions[actions.length - 1].payload.doc
          };
        })
      );
  }
}
