import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Subscription } from 'rxjs';
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
export class VocabularyresultComponent implements OnInit, OnDestroy {
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
  private sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('title');
    });
  }

  ngOnInit() {
    this.sub = this.vocabularyService.deleteVocabularyId$.subscribe(id => {
      this.deleteVocabularyIds.push(id);
    });
  }

  findId(vocabularyId) {
    return this.deleteVocabularyIds.find(id => id === vocabularyId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
