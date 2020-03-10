import { Component, OnInit } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popularvocabulary',
  templateUrl: './popularvocabulary.component.html',
  styleUrls: ['./popularvocabulary.component.scss']
})
export class PopularvocabularyComponent implements OnInit {
  vocabularies$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getPopularVocabularies();
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {}
}
