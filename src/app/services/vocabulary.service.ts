import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vocabulary } from '../interfaces/vocabulary';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  constructor(
    // データベースにアクセスする
    private db: AngularFirestore,
    private router: Router
  ) {}

  addVocabulary(vocabulary: Vocabulary) {
    // createIdは元からfirebaseの中で定義されている
    const vocabularyId = this.db.createId();
    return this.db
      .doc(`vocabularies/${vocabularyId}`)
      .set({
        vocabularyId,
        ...vocabulary
      })
      .then(() => {
        this.router.navigateByUrl('/myvocabulary');
      });
  }
  getVocabulary(user: string): Observable<Vocabulary> {
    return this.db
      .collection<Vocabulary>('vocabularies', ref =>
        ref.where('user', '==', user)
      )
      .valueChanges()
      .pipe(
        map(vocabularies => {
          if (vocabularies.length) {
            return vocabularies[0];
          } else {
            return null;
          }
        })
      );
  }
}
