import {
  Component,
  OnInit,
  Inject,
  forwardRef,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';
@Component({
  selector: 'app-searchtags',
  templateUrl: './searchtags.component.html',
  styleUrls: ['./searchtags.component.scss']
})
export class SearchtagsComponent extends BaseWidget implements OnInit {
  @Output() tags = new EventEmitter();
  @Input() tagsArray: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public state: {
    items: any[];
    refine: (tag: string) => void;
    createURL: () => void;
    isFromSearch: boolean;
    searchForItems: any;
    isShowingMore: boolean;
    canToggleShowMore: boolean;
    toggleShowMore: () => void;
    widgetParams: object;
  };
  tagOptions: [];

  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('tagInput', { static: true }) tagInput: ElementRef<
    HTMLInputElement
  >;
  tagsControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('RefinementList');
  }

  ngOnInit() {
    this.createWidget(connectRefinementList, {
      attribute: 'tags',
      limit: 5
    });
    super.ngOnInit();
    // formに入力された値を取得してる
    this.tagsControl.valueChanges.subscribe(value => {
      this.handleChange(value);
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.tagsArray.length < 3) {
      this.tagsArray.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.tags.emit(this.tagsArray);
  }

  /* Remove dynamic languages */
  remove(subject: string): void {
    const index = this.tagsArray.indexOf(subject);
    if (index >= 0) {
      this.tagsArray.splice(index, 1);
    }
    this.tags.emit(this.tagsArray);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagsArray.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagsControl.setValue(null);
    this.tags.emit(this.tagsArray);
  }

  async aryDelete(value, tagsArray) {
    value = value.filter(v => {
      let check = true;
      for (const i in tagsArray) {
        if (v.value === tagsArray[i]) {
          check = false;
          break;
        }
      }
      return check;
    });
    return value;
  }

  // これがないと検索して絞り込みができない
  handleChange(value) {
    // valueは入力欄に入力した値
    this.aryDelete(this.state.items, this.tagsArray).then(tags => {
      this.state.items = this.tagOptions;
      this.tagOptions = tags;
      this.state.searchForItems(value);
    });
  }
}
