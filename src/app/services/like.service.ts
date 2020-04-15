import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
        .pipe(
          take(1),
          map(doc => {
            return !!doc;
          })
        )
    );
  }
}
