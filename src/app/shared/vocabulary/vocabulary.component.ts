import { Component, OnInit, Input } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {
  // 親からvocabularyという型を受け取る
  @Input() vocabulary: VocabularyWithAuthor;
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {
    console.log(this.vocabulary);
  }
}
