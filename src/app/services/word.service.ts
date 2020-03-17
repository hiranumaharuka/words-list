import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Word } from '../interfaces/word';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getWord(vocabularyId: string, wordId: string): Observable<Word> {
    return this.db
      .doc<Word>(`vocabulares/${vocabularyId}/words/${wordId}`)
      .valueChanges();
  }
  getWords(
    vocabularyId: string,
    startAt?: QueryDocumentSnapshot<Word>
  ): Observable<QueryDocumentSnapshot<Word>[]> {
    return this.db
      .collection<Word>(`vocabularies/${vocabularyId}/words`, ref => {
        if (startAt) {
          return ref.orderBy('createdAt', 'desc').startAfter(startAt);
        } else {
          return ref.orderBy('createdAt', 'desc').limit(6);
        }
      })
      .snapshotChanges()
      .pipe(map(snaps => snaps.map(snap => snap.payload.doc)));
  }
  updateWord(vocabularyId: string, word: Word): Promise<void> {
    return this.db
      .doc(`vocabularies/${vocabularyId}/words/${word.wordId}`)
      .set(word, {
        merge: true
      });
  }
  deleteWord(vocabularyId: string, wordId: string): Promise<void> {
    return this.db.doc(`vocabularies/${vocabularyId}/words/${wordId}`).delete();
  }
}
