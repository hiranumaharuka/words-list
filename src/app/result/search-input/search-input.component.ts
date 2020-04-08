import { environment } from './../../../environments/environment';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);

type Mode = 'vocabularies' | 'words';
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  inputControl = new FormControl();

  options = [];

  @Output() querySuggestionSelected = new EventEmitter<{ query: string }>();
  // mode$: Observable<Mode>;
  mode: Mode;
  constructor(private route: ActivatedRoute) {
    // 値が変わった時だけ上下選べる
    this.inputControl.valueChanges.subscribe(value => {
      this.testSearch(value);
    });
    this.route.queryParamMap.subscribe(map => {
      // 中身取れてる
      this.mode = map.get('mode') as Mode;
      this.testSearch('');
    });
  }

  testSearch(query: string) {
    searchClient
      .search([
        {
          indexName: this.mode,
          query: query || '',
          params: null
        }
      ])
      .then(result => {
        this.options = result.results[0].hits;
      })
      .catch(error => console.log(error));
  }

  ngOnInit() {}
}
