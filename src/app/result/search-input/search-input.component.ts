import {
  Component,
  OnInit,
  EventEmitter,
  Inject,
  forwardRef,
  Output
} from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectAutocomplete } from 'instantsearch.js/es/connectors';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
type Mode = 'vocabularies' | 'words';
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent extends BaseWidget implements OnInit {
  state: {
    query: string;
    refine: (target: string) => void;
    indices: object[];
  };
  inputControl = new FormControl();

  @Output() querySuggestionSelected = new EventEmitter<{ query: string }>();
  mode: Mode;
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    private route: ActivatedRoute
  ) {
    super('AutocompleteComponent');
    // 値が変わった時だけ上下選べる
    this.inputControl.valueChanges.subscribe(value => {
      this.state.refine(value);
    });
    this.route.queryParamMap.subscribe(map => {
      this.mode = map.get('mode') as Mode;
      console.log('modeの中身は' + this.mode);
    });
  }

  public ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();
  }
}
