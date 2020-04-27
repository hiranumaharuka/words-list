import {
  Component,
  OnInit,
  Inject,
  forwardRef,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import { FormBuilder, FormControl } from '@angular/forms';
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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  vocabularyId: string;
  isEditing: boolean;
  demos = [
    {
      title: 'test',
      value: 11
    },
    {
      title: 'test',
      value: 11
    },
    {
      title: 'test',
      value: 11
    }
  ];
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
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('tagInput', { static: true }) tagInput: ElementRef<
    HTMLInputElement
  >;
  tagsArray: string[] = [];
  options = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    private fb: FormBuilder
  ) {
    super('RefinementList');
  }
  tagsControl = new FormControl();

  ngOnInit() {
    this.createWidget(connectRefinementList, {
      // instance options
      attribute: 'tags'
    });
    super.ngOnInit();

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

  handleChange(value) {
    this.state.searchForItems(value);
    // if (this.lastValue !== value) {
    //   this.state.searchForItems(value);
    //   this.tagOptions = this.state.items.filter(
    //     item => !this.isExsists(item.label)
    //   );
    //   this.lastValue = value;
    // }
  }
}
