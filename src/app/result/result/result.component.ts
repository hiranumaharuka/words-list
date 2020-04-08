import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { SearchParameters } from 'angular-instantsearch/instantsearch/instantsearch';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
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
    hitsPerPage: 5
  };
  resultParams = {
    hitsPerPage: 5,
    page: 0,
    query: ''
    // filters: 'tag: "英検"'
  };
  items;
  isVisible: boolean;
  mode: Mode;
  // configはこれだけ
  config = {
    indexName: 'words',
    searchClient
  };
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(map => {
      this.config.indexName = map.get('mode') as Mode;
      const query = map.get(
        this.config.indexName === 'vocabularies' ? 'title' : 'surface'
      );
      this.testSearch(this.config.indexName, query);
      switch (this.config.indexName) {
        case 'vocabularies':
          // this.resultParams.query = map.get('title');
          break;
        case 'words':
          // this.resultParams.query = map.get('surface');
          break;
      }
    });
  }

  testSearch(indexName: string, query: string) {
    console.log(query);
    searchClient
      .search([
        {
          indexName,
          query,
          params: null
        }
      ])
      .then(result => {
        this.items = result.results[0].hits;
      })
      .catch(error => console.log(error));
  }

  ngOnInit() {}

  search(value) {
    switch (this.config.indexName) {
      case 'vocabularies':
        this.router.navigate(['/result'], {
          queryParams: { title: value },
          queryParamsHandling: 'merge'
        });
        console.log(value);
        break;
      case 'words':
        this.router.navigate(['/result'], {
          queryParams: { surface: value },
          queryParamsHandling: 'merge'
        });
        console.log(value);
        break;
    }
  }
  nextPage() {
    this.resultParams.page++;
  }
}
