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
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from '@angular/material';
@Component({
  selector: 'app-searchtags',
  templateUrl: './searchtags.component.html',
  styleUrls: ['./searchtags.component.scss']
})
export class SearchtagsComponent extends BaseWidget implements OnInit {
  @Output() tags = new EventEmitter();
  @Input() tagsArray = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public state: {
    items: any[];
    searchForItems: any;
  };
  tagOptions: any[];
  lastValue: string;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('tagInput', { static: true }) tagInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
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
    // this.tagsControl.valueChanges.subscribe(value => {
    //   this.handleChange(value);
    // });
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add language
      if ((value || '').trim() && this.tagsArray.length < 5) {
        if (!this.isExsists(value)) {
          this.tagsArray.push(value.trim());
        }
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.tagsControl.setValue(null);
      this.tags.emit(this.tagsArray);
    }
  }

  /* Remove dynamic languages */
  remove(value: { label: string }): void {
    const index = this.tagsArray.findIndex(tag => tag.label === value.label);
    if (index >= 0) {
      this.tagsArray.splice(index, 1);
    }
    this.tags.emit(this.tagsArray);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (
      !this.isExsists(event.option.value.label) &&
      this.tagsArray.length < 5
    ) {
      this.tagsArray.push(event.option.value.label);
      this.tagInput.nativeElement.value = '';
      this.tagsControl.setValue(null);
      this.tags.emit(this.tagsArray);
    }
  }

  // これがないと検索して絞り込みができない
  handleChange(value) {
    // handleChange($event: KeyboardEvent) {
    // valueは入力欄に入力した値
    // const value = ($event.target as HTMLInputElement).value;
    if (this.lastValue !== value) {
      this.state.searchForItems(value);
      console.log('前');
      console.log(this.tagOptions);

      this.tagOptions = this.state.items.filter(
        item => !this.isExsists(item.label)
      );
      console.log('後');
      console.log(this.tagOptions);
      this.lastValue = value;
    }
  }

  private isExsists(value: string): boolean {
    return !!this.tagsArray.find(tag => tag.label === value);
  }
}
