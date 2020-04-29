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
import { FormControl, Validators } from '@angular/forms';
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
  @Output() tagEmit = new EventEmitter();
  @Input() tagsArray = [];
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('tagInput', { static: true }) tagInput: ElementRef<
    HTMLInputElement
  >;
  state: {
    items: any[];
    searchForItems: any;
  };
  tagsControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('SearchtagsComponent');
  }
  get tagOptions() {
    const items = this.state.items || [];
    return items.filter(item => {
      return !this.isExists(item.label);
    });
  }
  ngOnInit() {
    this.createWidget(connectRefinementList, {
      attribute: 'tags',
      limit: 5
    });
    super.ngOnInit();
    this.tagsControl.valueChanges.subscribe(value => {
      this.state.searchForItems(value || '');
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.tagsArray.length < 3) {
      if (!this.isExists(value)) {
        this.tagsArray.push(value.trim());
      }
    }
    if (input) {
      input.value = '';
    }
    if (this.tagsArray.length >= 3) {
      this.chipList.errorState = true;
    }
    this.tagsControl.setValue(null);
    this.tagEmit.emit(this.tagsArray);
  }

  remove(value: { label: string }): void {
    const index = this.tagsArray.findIndex(tag => tag.label === value.label);
    if (index >= 0) {
      this.tagsArray.splice(index, 1);
    }
    if (this.tagsArray.length <= 3) {
      this.chipList.errorState = false;
    }
    this.tagEmit.emit(this.tagsArray);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.isExists(event.option.value.label) && this.tagsArray.length < 3) {
      this.tagsArray.push(event.option.value.label);
      this.tagInput.nativeElement.value = '';
      this.tagsControl.setValue(null);
      this.tagEmit.emit(this.tagsArray);
    }
    if (this.tagsArray.length > 3) {
      this.chipList.errorState = true;
    }
  }

  private isExists(value: string): boolean {
    return !!this.tagsArray.find(tag => tag === value);
  }
}
