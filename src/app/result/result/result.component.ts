import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { SearchParameters } from 'angular-instantsearch/instantsearch/instantsearch';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Word } from 'src/app/interfaces/word';
const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);
type Mode = 'vocabularies' | 'words';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  inputParams: SearchParameters = {
    hitsPerPage: 5,
    filters: ''
  };
  resultParams = {
    hitsPerPage: 5,
    page: 0,
    query: ''
  };
  mode: Mode;
  config = {
    indexName: 'words',
    searchClient
  };
  options = [];
  option;
  wordId: string;
  params;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(map => {
      this.config.indexName = map.get('mode') as Mode;
      this.params = map.get(
        this.config.indexName === 'vocabularies' ? 'title' : 'surface'
      );
    });
  }
  ngOnInit() {
    this.deleteWord(this.wordId);
  }

  search(value) {
    switch (this.config.indexName) {
      case 'vocabularies':
        this.router.navigate(['/result'], {
          queryParams: { title: value },
          queryParamsHandling: 'merge'
        });
        break;
      case 'words':
        this.router.navigate(['/result'], {
          queryParams: { surface: value },
          queryParamsHandling: 'merge'
        });
        break;
    }
  }
  nextPage() {
    this.resultParams.page++;
  }

  deleteWord(wordId) {
    this.wordId = wordId;
  }
}
