import { Component, OnInit, Input } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WordService } from 'src/app/services/word.service';
const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);
type Mode = 'vocabularies' | 'words';
@Component({
  selector: 'app-word-result',
  templateUrl: './word-result.component.html',
  styleUrls: ['./word-result.component.scss']
})
export class WordResultComponent implements OnInit {
  resultParams = {
    hitsPerPage: 5,
    page: 0,
    query: '',
    filters: `isDeleted=0`
  };
  @Input() mode: Mode;
  uid: string = this.authService.uid;
  config = {
    indexName: 'words',
    searchClient
  };
  indexName = this.config.indexName;
  public deleteWordIds = [];
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private wordService: WordService
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('surface');
    });
  }

  ngOnInit() {}

  findId(wordId) {
    return this.deleteWordIds.find(id => id === wordId);
  }

  deleteWord(vocabularyId: string, wordId: string) {
    this.wordService.deleteWord(vocabularyId, wordId);
    this.wordService.getDeleteWordId(wordId);
    this.deleteWordIds.push(wordId);
  }
}
