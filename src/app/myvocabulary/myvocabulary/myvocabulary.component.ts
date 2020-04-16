import { Component, OnInit } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';
import { firestore } from 'firebase';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-myvocabulary',
  templateUrl: './myvocabulary.component.html',
  styleUrls: ['./myvocabulary.component.scss']
})
export class MyvocabularyComponent implements OnInit {
  startAfter: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  vocabularies: VocabularyWithAuthor[] = [];
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
        vocabulariesData.map(doc => this.vocabularies.push(doc));
      });
  }
  deleteVocabulary(vocabularyId: string) {
    const targetIndex = this.vocabularies.findIndex(
      vocabulary => vocabulary.vocabularyId === vocabularyId
    );
    this.vocabularies.splice(targetIndex, 1);
  }
}
