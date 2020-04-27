import {
  Component,
  OnInit,
  Inject,
  forwardRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';
import { Vocabulary, User } from 'src/app/interfaces/vocabulary';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Location } from '@angular/common';
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
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  vocabularyId: string;
  isEditing: boolean;
  public state: {
    items: object[];
    refine: (tag: string) => void;
    createURL: () => void;
    isFromSearch: boolean;
    searchForItems: () => void;
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
  form = this.fb.group({
    // 最初の,までで初期値を指定
    // validators.requiredは必須入力にするため
    title: ['', [Validators.required, Validators.maxLength(60)]],
    description: ['', [Validators.maxLength(100)]],
    tags: [this.tagsArray, [Validators.maxLength(100)]]
  });
  options = [];
  // エラー内容を取得する
  get titleControl() {
    return this.form.get('title') as FormControl;
  }
  // form配列をtagとして扱えるように
  get tagsControl() {
    return this.form.get('tags') as FormArray;
  }
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent,
    private fb: FormBuilder
  ) {
    super('RefinementList');
  }

  ngOnInit() {
    this.createWidget(connectRefinementList, {
      // instance options
      attribute: 'tags'
    });
    super.ngOnInit();
  }
}
