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
  mode: Mode;
  // configはこれだけ
  config = {
    indexName: 'vocabularies',
    searchClient
  };
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(map => {
      this.config.indexName = map.get('mode') as Mode;
      console.log('constructorの中のindexNameは' + this.config.indexName);
      if (this.config.indexName === 'vocabularies') {
        this.route.queryParamMap.subscribe(paramMap => {
          this.resultParams.query = paramMap.get('title');
          console.log('constructorの中のtitle取得しました');
        });
      } else if (this.config.indexName === 'words') {
        this.route.queryParamMap.subscribe(param => {
          this.resultParams.query = param.get('surface');
          console.log('constructorの中のsurface取得しました');
        });
      }
    });
  }
  ngOnInit() {}
  search(title?: string, surface?: string) {
    // 検索する度にresultに飛ぶ、queryparamsを追加する
    console.log('resultのindexNameの中身は' + this.config.indexName);
    if (this.config.indexName === 'vocabularies') {
      this.router.navigate(['/result'], {
        queryParams: { title },
        queryParamsHandling: 'merge'
      });
      console.log('titleを追加しました');
    } else if (this.config.indexName === 'words') {
      this.router.navigate(['/result'], {
        queryParams: { surface },
        queryParamsHandling: 'merge'
      });
      console.log('surfaceを追加しました');
    }
    // this.router.navigate(['/result'], {
    //   queryParams: { title },
    //   queryParamsHandling: 'merge'
    // });
  }

  nextPage() {
    this.resultParams.page++;
  }
}
