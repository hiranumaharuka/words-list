import { Component, OnInit } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favvocabulary',
  templateUrl: './favvocabulary.component.html',
  styleUrls: ['./favvocabulary.component.scss']
})
export class FavvocabularyComponent implements OnInit {
  vocabularies$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getVocabularies();
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {}
}
