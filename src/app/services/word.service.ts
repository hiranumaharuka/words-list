import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Word } from '../interfaces/word';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}
  addWord(
    word: Omit<Word, 'wordId'>,
    uid: string,
    vocabularyId: string
  ): Promise<void> {
    const wordId = this.db.createId();
    return this.db
      .doc(`vocabularies/${vocabularyId}/words/${wordId}`)
      .set({
        wordId,
        ...word,
        authorId: uid
      })
      .then(() => {
        this.snackBar.open('単語帳を作成しました', null, { duration: 1500 });
      });
  }
  getWords(vocabularyId: string): Observable<Word[]> {
    return this.db
      .collection<Word>(`vocabularies/${vocabularyId}/words`)
      .valueChanges();
  }
}
