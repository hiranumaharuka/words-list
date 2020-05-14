import { Component, OnInit } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { firestore } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-favvocabulary',
  templateUrl: './favvocabulary.component.html',
  styleUrls: ['./favvocabulary.component.scss']
})
export class FavvocabularyComponent implements OnInit {
  startAfter: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  vocabularies: VocabularyWithAuthor[] = [];
  uid: string = this.authService.uid;
  isNext: boolean;
  deleted$: Observable<boolean> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.isDeleted));

  constructor(
    private vocabularyService: VocabularyService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.getMore();
  }

  getMore() {
    this.vocabularyService
      .getLikedVocabularies(this.authService.uid, this.startAfter)
      .pipe(take(1))
      .subscribe(({ vocabulariesData, lastDoc }) => {
        this.startAfter = lastDoc;
        this.vocabularyService
          .getUser(this.uid)
          .pipe(take(1))
          .subscribe(user => {
            if (this.vocabularies.length + 3 < user.likedVocabulary) {
              vocabulariesData.map(doc => this.vocabularies.push(doc));
              this.isNext = true;
            } else {
              vocabulariesData.map(doc => this.vocabularies.push(doc));
              this.isNext = false;
            }
          });
      });
  }
  deleteVocabulary(vocabularyId: string) {
    const targetIndex = this.vocabularies.findIndex(
      vocabulary => vocabulary.vocabularyId === vocabularyId
    );
    this.vocabularies.splice(targetIndex, 1);
  }
}
