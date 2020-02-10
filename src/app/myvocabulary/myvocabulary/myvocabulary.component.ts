import { Component, OnInit } from '@angular/core';
import {
  VocabularyWithAuthor,
  Vocabulary
} from 'src/app/interfaces/vocabulary';
import { Observable } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-myvocabulary',
  templateUrl: './myvocabulary.component.html',
  styleUrls: ['./myvocabulary.component.scss']
})
export class MyvocabularyComponent implements OnInit {
  vocabularies$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getVocabularies();
  moreItems$: Observable<{
    docs: Vocabulary[];
    lastDoc: QueryDocumentSnapshot<Vocabulary>;
  }>;
  constructor(
    private vocabularyService: VocabularyService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}
