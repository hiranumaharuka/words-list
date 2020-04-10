import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges
} from '@angular/core';
import { environment } from './../../../environments/environment';
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
export class SearchInputComponent implements OnInit, OnChanges {
  inputControl = new FormControl();

  options = [];
  otpion;
  @Output() querySuggestionSelected = new EventEmitter<{ query: string }>();
  @Input() wordId: string;
  mode: Mode;
  constructor(private route: ActivatedRoute) {
    // 値が変わった時だけ上下選べる
    this.inputControl.valueChanges.subscribe(value => {
      this.testSearch(value);
    });
    // 切り替えてすぐ、何も入力してない時
    this.route.queryParamMap.subscribe(map => {
      this.mode = map.get('mode') as Mode;
      this.testSearch('');
    });
  }

  testSearch(query: string, wordId?: string) {
    searchClient
      .search([
        {
          indexName: this.mode,
          // queryが何も無ければ(nullであれば)空文字列を渡す
          // これによって最初から候補が入ってくる
          query: query || '',
          params: null
        }
      ])
      .then(result => {
        this.options = result.results[0].hits.slice(0, 5);
      })
      .catch(error => console.log(error));
  }
  deleteOption(option, wordId) {
    const index = searchClient.initIndex('words');
    index.search(option).then(result => {
      this.options = result.hits;
      console.log('optionsの中身は');
      console.log(this.options);
      const targetIndex = this.options.findIndex(
        word => word.wordId === wordId
      );
      this.options.splice(targetIndex, 1);
      console.log('wordIdは' + wordId);
    });
  }

  ngOnInit() {}
  ngOnChanges() {
    // 単語を入れて消した瞬間はoptionから消えるけど、単語を消すと復活する
    // 検索表示制限が効かない
    this.deleteOption(this.otpion, this.wordId);
  }
}
