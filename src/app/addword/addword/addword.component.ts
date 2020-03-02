import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Word } from 'src/app/interfaces/word';
import { WordService } from 'src/app/services/word.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addword',
  templateUrl: './addword.component.html',
  styleUrls: ['./addword.component.scss']
})
export class AddwordComponent implements OnInit {
  vocabularyId: string;
  form = this.fb.group({
    surface: ['', [Validators.required]],
    backside: ['', [Validators.required]]
  });
  get surfaceControl() {
    return this.form.get('surface') as FormControl;
  }
  get backsideControl() {
    return this.form.get('backside') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private wordService: WordService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.vocabularyId = this.route.snapshot.paramMap.get('vocabularyId');
  }
  submit(form: NgForm) {
    const formData = this.form.value;
    const sendData: Omit<Word, 'wordId'> = {
      surface: formData.surface,
      backside: formData.backside,
      createdAt: new Date(),
      authorId: this.authService.uid
    };
    this.wordService.addWord(sendData, this.authService.uid, this.vocabularyId);
    form.resetForm();
  }
  goBack(): void {
    this.location.back();
  }
}
