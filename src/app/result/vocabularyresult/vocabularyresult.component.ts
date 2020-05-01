import {
  Vocabulary,
  VocabularyWithAuthor
} from './../../interfaces/vocabulary';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MultiResponse } from 'algoliasearch';
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
    hitsPerPage: 3,
    page: 0,
    query: ''
  };
  isLoading: boolean;
  page = 0;
  @Input() mode: Mode;

  results: VocabularyWithAuthor[] = [];
  isMoreActive = true;
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

  getNextPage() {
    this.isLoading = true;
    searchClient
      .search([
        {
          indexName: 'vocabularies',
          query: this.resultParams.query,
          params: {
            page: this.page++,
            hitsPerPage: 5
          }
        }
      ])
      .then((results: MultiResponse<Vocabulary>) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
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
        } else {
          console.log('もうないです');
        }
      });
  }
}
