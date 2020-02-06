import { Component, OnInit } from '@angular/core';
import {
  Vocabulary,
  VocabularyWithAuthor
} from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  vocabularies$: Observable<
    Vocabulary[]
  > = this.vocabularyService.getVocabularies();
  results$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getVocabularies();
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {}
}
