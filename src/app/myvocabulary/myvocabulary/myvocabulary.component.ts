import { Component, OnInit } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';
import { firestore, User } from 'firebase';
import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myvocabulary',
  templateUrl: './myvocabulary.component.html',
  styleUrls: ['./myvocabulary.component.scss']
})
export class MyvocabularyComponent implements OnInit {
  startAfter: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  vocabularies: VocabularyWithAuthor[] = [];
  isNext: boolean;
  uid: string = this.authService.uid;
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
      .getMyVocabularies(this.authService.uid, this.startAfter)
      .pipe(take(1))
      .subscribe(({ vocabulariesData, lastDoc }) => {
        this.startAfter = lastDoc;
        this.vocabularyService
          .getUser(this.uid)
          .pipe(take(1))
          .subscribe(user => {
            if (this.vocabularies.length + 3 < user.createdVocabulary) {
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
