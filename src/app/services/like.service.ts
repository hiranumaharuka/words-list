import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../interfaces/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private db: AngularFirestore) {}

  likeVocabulary(vocabularyId: string, userId: string): Promise<void[]> {
    // promise.all()は引数に指定したすべてのpromiseを実行するメソッド
    // すべての結果が履行(fulfilled)された場合は、fullfilledの値を集めた配列を返す
    return Promise.all([
      // vocabularyにいいねしている人のドキュメント作成
      // setはdocと使うとドキュメント名を指定し,ドキュメントを追加する
      this.db
        .doc(`vocabularies/${vocabularyId}/likedUserIds/${userId}`)
        // userIdがドキュメントの中身
        .set({ userId }),
      // 自分のいいねリストを取得するために追加
      this.db
        .doc(`users/${userId}/likedVocabularies/${vocabularyId}`)
        .set({ vocabularyId })
    ]);
  }
  dislikeVocabulary(vocabularyId: string, userId: string): Promise<void[]> {
    return Promise.all([
      this.db
        .doc(`vocabularies/${vocabularyId}/likedUserIds/${userId}`)
        .delete(),
      this.db.doc(`users/${userId}/likedVocabularies/${vocabularyId}`).delete()
    ]);
  } // vocabularyにいいねしているかどうかチェック

  isLiked(vocabularyId: string, userId: string): Observable<boolean> {
    // vocabularyにいいねしている人のドキュメントを取得
    return (
      this.db
        .doc(`vocabularies/${vocabularyId}/likedUserIds/${userId}`)
        .valueChanges()
        // doc=vocabularyにいいねしている人のドキュメント一覧
        // docがあればtrue、docがなければfalseでbooleanで判断できるようにしている
        .pipe(map(doc => !!doc))
    );
  }
  // vocabularyにいいねした人の一覧を取得する
  // observableの型がstringだとエラーが出る
  // getLikedUserIds(vocabularyId: string): Observable<any[]> {
  //   return this.db
  //   // vocabularyにいいねしている人のID一覧が入ってるサブコレクション取得
  //     .collection(`vocabularies/${vocabularyId}/likedUserIds`)
  //     .valueChanges()
  //     .pipe(
  //       // users=vocabularyにいいねした人のID一覧
  //       switchMap(users => {
  //         return combineLatest(
  //           // いいねした人のidからいいねした人本体を取り出す
  //           users.map(user => this.db.doc(`users/${user.id}`).valueChanges())
  //         );
  //       })
  //     );
  // }
  // 自分がいいねしたアイテムを取得する
  // observableの型がstringだとエラーが出る
  // getMyLikedItems(userId: string): Observable<string[]> {
  //   return this.db
  //   // いいねした記事のID一覧を取得
  //     .collection(`users/${userId}/likedVocabularies`)
  //     .valueChanges()
  //     .pipe(
  //       // vocabularies = いいねした記事のid一覧
  //       switchMap(vocabularies => {
  //         return combineLatest(
  //           vocabularies.map(vocabulary =>
  //             this.db.doc(`vocabularies/${vocabulary.id}`).valueChanges()
  //           )
  //         );
  //       })
  //     );
  // }
}
