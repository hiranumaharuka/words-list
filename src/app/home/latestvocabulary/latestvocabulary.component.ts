import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable } from 'rxjs';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';

@Component({
  selector: 'app-latestvocabulary',
  templateUrl: './latestvocabulary.component.html',
  styleUrls: ['./latestvocabulary.component.scss']
})
export class LatestvocabularyComponent implements OnInit {
  vocabularies$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getLatestVocabularies();
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {}
}
