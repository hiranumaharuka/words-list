import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Subscription } from 'rxjs';
import { MultiResponse } from 'algoliasearch';
import {
  Vocabulary,
  VocabularyWithAuthor
} from 'src/app/interfaces/vocabulary';
import { take } from 'rxjs/operators';
const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);
type Mode = 'vocabularies' | 'words';

@Component({
  selector: 'app-vocabulary-result',
  templateUrl: './vocabulary-result.component.html',
  styleUrls: ['./vocabulary-result.component.scss']
})
export class VocabularyResultComponent implements OnInit, OnDestroy {
  resultParams = {
    hitsPerPage: 10,
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
  page = 0;
  isLoading = true;
  isMoreActive = true;
  results: VocabularyWithAuthor[] = [];
  private sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('title');
      this.results = [];
      this.page = 0;
      this.getMore();
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

  getMore() {
    this.isLoading = true;
    this.isMoreActive = true;
    searchClient
      .search([
        {
          indexName: 'vocabularies',
          query: this.resultParams.query,
          params: {
            page: this.page++,
            hitsPerPage: 10
          }
        }
      ])
      .then((results: MultiResponse<Vocabulary>) => {
        this.isLoading = false;
        const totalPage = results.results[0].nbPages;
        if (totalPage === this.page) {
          this.isMoreActive = false;
        }
        if (results.results[0].hits.length) {
          this.vocabularyService
            .mergeUser(results.results[0].hits)
            .pipe(take(1))
            .subscribe((items: VocabularyWithAuthor[]) => {
              this.results = this.results.concat(items);
            });
        }
      });
  }
}
