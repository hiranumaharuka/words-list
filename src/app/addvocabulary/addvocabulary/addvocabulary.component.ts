import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  forwardRef
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);
@Component({
  selector: 'app-addvocabulary',
  templateUrl: './addvocabulary.component.html',
  styleUrls: ['./addvocabulary.component.scss']
})
export class AddvocabularyComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  vocabularyId: string;
  isEditing: boolean;
  public state: {
    items: object[];
    // refine: Function;
    // createURL: Function;
    isFromSearch: boolean;
    // searchForItems: Function;
    isShowingMore: boolean;
    canToggleShowMore: boolean;
    // toggleShowMore: Function;
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
  config = {
    indexName: 'vocabularies',
    searchClient
  };
  constructor(
    private fb: FormBuilder,
    private vocabularyService: VocabularyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.patchDefaultValue();
  }

  submit() {
    const formData = this.form.value;
    const sendData: Omit<Vocabulary, 'vocabularyId' | 'likedCount'> = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
      authorId: this.authService.uid,
      createdAt: new Date()
    };
    this.vocabularyService.addVocabulary(sendData, this.authService.uid);
  }

  updateVocabulary() {
    const formData = this.form.value;
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.vocabularyId = params.get('vocabularyId');
      this.vocabularyService
        .getVocabulary(this.vocabularyId)
        .pipe(take(1))
        .subscribe(word => {
          const sendData: Omit<Vocabulary, 'createdAt' | 'likedCount'> = {
            title: formData.title,
            description: formData.description,
            tags: formData.tags,
            authorId: word.authorId,
            vocabularyId: word.vocabularyId
          };
          this.vocabularyService
            .updateVocabulary(sendData)
            .then(() => this.goBack());
        });
    });
  }

  patchDefaultValue() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.vocabularyId = params.get('vocabularyId');
      if (this.vocabularyId) {
        this.isEditing = true;
        this.vocabularyService
          .getVocabulary(this.vocabularyId)
          .pipe(take(1))
          .subscribe(vocabulary => {
            this.tagsArray = vocabulary.tags;
            this.form.patchValue({
              title: vocabulary.title,
              description: vocabulary.description,
              tags: vocabulary.tags
            });
          });
      } else {
        this.isEditing = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  updateTag(value) {
    console.log('親の値');
    console.log(value);
  }
}
