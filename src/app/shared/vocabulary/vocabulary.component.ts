import { Component, OnInit, Input } from '@angular/core';
import {
  Vocabulary,
  VocabularyWithAuthor
} from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {
  // 親からvocabularyという型を受け取る
  @Input() vocabulary: Vocabulary[];
  results$: VocabularyWithAuthor[];
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {}
}
