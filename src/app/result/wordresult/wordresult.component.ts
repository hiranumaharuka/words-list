import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Word } from 'src/app/interfaces/word';
import { WordService } from 'src/app/services/word.service';
const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);
type Mode = 'vocabularies' | 'words';
@Component({
  selector: 'app-wordresult',
  templateUrl: './wordresult.component.html',
  styleUrls: ['./wordresult.component.scss']
})
export class WordresultComponent implements OnInit {
  resultParams = {
    hitsPerPage: 5,
    page: 0,
    query: ''
  };
  @Output() delete = new EventEmitter<string>();
  @Input() mode: Mode;
  uid: string = this.authService.uid;
  config = {
    indexName: 'words',
    searchClient
  };
  indexName = this.config.indexName;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private wordService: WordService
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('surface');
    });
  }

  ngOnInit() {}
  deleteWord(vocabularyId: string, wordId: string) {
    this.wordService.deleteWord(vocabularyId, wordId);
    this.router.navigate([/result/], {
      queryParams: {
        mode: 'words'
      }
    });
    this.delete.emit(wordId);
  }
}
