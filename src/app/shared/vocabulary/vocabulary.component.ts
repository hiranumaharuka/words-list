import { Component, OnInit, Input } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

  @Input() vocabulary: Vocabulary;
  constructor() { }

  ngOnInit() {
  }

}
