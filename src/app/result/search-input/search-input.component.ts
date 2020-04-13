import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { environment } from './../../../environments/environment';
import * as algoliasearch from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WordService } from 'src/app/services/word.service';
import { VocabularyService } from 'src/app/services/vocabulary.service';

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
export class SearchInputComponent implements OnInit, OnDestroy {
  inputControl = new FormControl();

  options = [];
  @Output() querySuggestionSelected = new EventEmitter<{ query: string }>();

  mode: Mode;
  public deleteWordIds = [];
  public deleteVocabularyIds = [];
  private subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private wordService: WordService,
    private vocbaularyService: VocabularyService
  ) {
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
  ngOnInit() {
    this.subscription = this.wordService.deleteWordId$.subscribe(id => {
      this.deleteWordIds.push(id);
    });
    this.subscription = this.vocbaularyService.deleteVocabularyId$.subscribe(
      id => {
        this.deleteVocabularyIds.push(id);
      }
    );
  }

  testSearch(query: string) {
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

  findIds(wordId) {
    return this.deleteWordIds.find(id => id === wordId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
