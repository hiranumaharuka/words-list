import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Word } from '../interfaces/word';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private deleteWordId = new Subject<string>();
  public deleteWordId$ = this.deleteWordId.asObservable();
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  addWord(
    word: Omit<Word, 'wordId' | 'vocabularyId' | 'isDeleted'>,
    uid: string,
    vocabularyId: string
  ): Promise<void> {
    this.loadingService.toggleLoading(true);
    const wordId = this.db.createId();
    return this.db
      .doc(`vocabularies/${vocabularyId}/words/${wordId}`)
      .set({
        wordId,
        ...word,
        vocabularyId,
        authorId: uid,
        isDeleted: false
      })
      .then(() => {
        this.snackBar.open('単語帳を作成しました', null, { duration: 1500 });
        this.loadingService.toggleLoading(false);
      });
  }

  getWord(vocabularyId: string, wordId: string): Observable<Word> {
    this.loadingService.toggleLoading(true);
    return this.db
      .doc<Word>(`vocabularies/${vocabularyId}/words/${wordId}`)
      .valueChanges()
      .pipe(tap(() => this.loadingService.toggleLoading(false)));
  }

  getWords(
    vocabularyId: string,
    startAt?: QueryDocumentSnapshot<Word>
  ): Observable<QueryDocumentSnapshot<Word>[]> {
    this.loadingService.toggleLoading(true);
    return this.db
      .collection<Word>(`vocabularies/${vocabularyId}/words`, ref => {
        if (startAt) {
          return ref.orderBy('createdAt', 'desc').startAfter(startAt);
        } else {
          return ref.orderBy('createdAt', 'desc').limit(6);
        }
      })
      .get({ source: 'server' })
      .pipe(
        map(snaps => snaps.docs.map(doc => doc as QueryDocumentSnapshot<Word>)),
        tap(() => this.loadingService.toggleLoading(false))
      );
  }

  updateWord(
    vocabularyId: string,
    word: Omit<Word, 'createdAt' | 'isDeleted'>
  ): Promise<void> {
    this.loadingService.toggleLoading(true);
    return this.db
      .doc(`vocabularies/${vocabularyId}/words/${word.wordId}`)
      .update({
        ...word
      })
      .then(() => {
        this.snackBar.open('単語を編集しました', null, { duration: 1500 });
        this.loadingService.toggleLoading(false);
      });
  }

  deleteWord(vocabularyId: string, wordId: string): Promise<void> {
    this.loadingService.toggleLoading(true);
    return this.db
      .doc(`vocabularies/${vocabularyId}/words/${wordId}`)
      .delete()
      .then(() => this.loadingService.toggleLoading(false));
  }

  public getDeleteWordId(deleteId: string) {
    this.deleteWordId.next(deleteId);
  }
}
