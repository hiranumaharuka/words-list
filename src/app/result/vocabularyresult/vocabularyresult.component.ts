import { Component, OnInit, Input } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { VocabularyService } from 'src/app/services/vocabulary.service';
const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);
type Mode = 'vocabularies' | 'words';

@Component({
  selector: 'app-vocabularyresult',
  templateUrl: './vocabularyresult.component.html',
  styleUrls: ['./vocabularyresult.component.scss']
})
export class VocabularyresultComponent implements OnInit {
  resultParams = {
    hitsPerPage: 5,
    page: 0,
    query: ''
  };
  @Input() mode: Mode;

  config = {
    indexName: 'vocabularies',
    searchClient
  };
  indexName = this.config.indexName;
  public deleteVocabularyIds = [];

  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('title');
    });
  }

  ngOnInit() {}
  findIds(vocabularyId) {
    return this.deleteVocabularyIds.find(id => id === vocabularyId);
  }

  deleteWord(vocabularyId: string) {
    this.vocabularyService.deleteVocabulary(vocabularyId);
    this.vocabularyService.getDeleteVocabularyId(vocabularyId);
    this.deleteVocabularyIds.push(vocabularyId);
  }
}
