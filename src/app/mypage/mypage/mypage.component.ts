import { Component, OnInit } from '@angular/core';
import {
  VocabularyWithAuthor,
  Vocabulary
} from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  vocabularies$ = this.vocabularyService
    .getMyVocabularies(this.authService.uid)
    .pipe(
      tap(vocabularies => {
        console.log(vocabularies);
      })
    );
  moreItems$: Observable<{
    docs: Vocabulary[];
    lastDoc: QueryDocumentSnapshot<Vocabulary>;
  }>;
  constructor(
    private vocabularyService: VocabularyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.vocabularies$);
  }
  getMore(stratAfter: QueryDocumentSnapshot<Vocabulary>) {
    this.moreItems$ = this.vocabularyService.getMyVocabularies(
      this.authService.uid,
      stratAfter
    );
  }
}
