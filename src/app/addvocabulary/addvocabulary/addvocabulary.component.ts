import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';
import { Vocabulary } from 'src/app/interfaces/vocabulary';

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
  constructor(
    // formを作るための機能
    private fb: FormBuilder,
    private vocabularyService: VocabularyService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  submit() {
    // 結果表示のため
    // console.log(this.form.value);
    const formData = this.form.value;
    const sendData: Vocabulary = {
      title: formData.title,
      description: formData.description,
      tag: formData.tag,
      user: this.authService.uid
    };
    this.vocabularyService.addVocabulary(sendData);
  }
}
