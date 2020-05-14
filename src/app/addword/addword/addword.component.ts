import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Word } from 'src/app/interfaces/word';
import { WordService } from 'src/app/services/word.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-addword',
  templateUrl: './addword.component.html',
  styleUrls: ['./addword.component.scss']
})
export class AddwordComponent implements OnInit {
  vocabularyId: string;
  form = this.fb.group({
    surface: ['', [Validators.required, Validators.maxLength(300)]],
    backside: ['', [Validators.required, Validators.maxLength(200)]]
  });
  isEditing: boolean;
  word$: Observable<Word>;
  word: Word;
  wordId: string;
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
    this.word$ = this.route.queryParamMap.pipe(
      switchMap(map => {
        const wordId = map.get('wordId');
        return this.wordService.getWord(this.vocabularyId, wordId);
      })
    );
    this.vocabularyId = this.route.snapshot.paramMap.get('vocabularyId');
    this.patchDefaultValue();
  }

  submit(form: NgForm) {
    const formData = this.form.value;
    const sendData: Omit<Word, 'wordId' | 'vocabularyId' | 'isDeleted'> = {
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

  updateWord() {
    const formData = this.form.value;
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.wordId = params.get('wordId');
      this.wordService
        .getWord(this.vocabularyId, this.wordId)
        .pipe(take(1))
        .subscribe(word => {
          const sendData: Omit<Word, 'createdAt' | 'isDeleted'> = {
            surface: formData.surface,
            backside: formData.backside,
            authorId: word.authorId,
            wordId: word.wordId,
            vocabularyId: word.vocabularyId
          };
          this.wordService
            .updateWord(this.vocabularyId, sendData)
            .then(() => this.goBack());
        });
    });
  }

  patchDefaultValue() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.wordId = params.get('wordId');
      if (this.wordId) {
        this.isEditing = true;
        this.wordService
          .getWord(this.vocabularyId, this.wordId)
          .pipe(take(1))
          .subscribe(word => {
            this.form.patchValue({
              surface: word.surface,
              backside: word.backside
            });
          });
      } else {
        this.isEditing = false;
      }
    });
  }
}
