import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  addVocabulary(vocabulary: Vocabulary, uid: string): Promise<void> {
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
        this.router.navigateByUrl('/myvocabulary');
      });
  }

  getVocabularies(): Observable<VocabularyWithAuthor[]> {
    let vocabularies: Vocabulary[];
    return this.db
      .collection<Vocabulary>(`vocabularies`)
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
          console.log(users);
          return vocabularies.map(vocabulary => {
            const result: VocabularyWithAuthor = {
              ...vocabulary,
              author: users.find(
                user => user && user.id === vocabulary.authorId
              )
            };
            console.log(result);
            return result;
          });
        })
      );
  }
}
// getVocabulary(user: string): Observable<Vocabulary[]> {
//   return this.db
//     .collection<Vocabulary>('vocabularies', ref =>
//       ref.where('user', '==', user).limit(2)
//     )
//     .valueChanges()
//     .pipe(
//       map(vocabularies => {
//         if (vocabularies.length) {
//           return vocabularies;
//         } else {
//           return null;
//         }
//       })
//     );
// }
