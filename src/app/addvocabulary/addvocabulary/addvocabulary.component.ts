import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';
import { Vocabulary, User } from 'src/app/interfaces/vocabulary';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addvocabulary',
  templateUrl: './addvocabulary.component.html',
  styleUrls: ['./addvocabulary.component.scss']
})
export class AddvocabularyComponent implements OnInit {
  form = this.fb.group({
    // 最初の,までで初期値を指定
    // validators.requiredは必須入力にするため
    title: ['', [Validators.required, Validators.maxLength(60)]],
    description: ['', [Validators.maxLength(100)]],
    tag: ['', [Validators.maxLength(100)]]
  });
  // エラー内容を取得する
  get titleControl() {
    return this.form.get('title') as FormControl;
  }
  vocabularyId: string;
  isEditing: boolean;
  constructor(
    // formを作るための機能
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
      tag: formData.tag,
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
            tag: formData.tag,
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
            this.form.patchValue({
              title: vocabulary.title,
              description: vocabulary.description,
              tag: vocabulary.tag
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
}
