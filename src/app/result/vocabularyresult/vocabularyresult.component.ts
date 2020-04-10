import { Component, OnInit, Input } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('title');
    });
  }

  ngOnInit() {}
}
