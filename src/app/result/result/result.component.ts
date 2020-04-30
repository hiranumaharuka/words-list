import { Component, OnInit } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
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
  mode: Mode;
  config = {
    indexName: 'words',
    searchClient
  };
  params;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(map => {
      this.config.indexName = map.get('mode') as Mode;
      this.params = map.get(
        this.config.indexName === 'vocabularies' ? 'title' : 'surface'
      );
    });
  }

  ngOnInit() {}

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
}
