import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/interfaces/word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  @Input()
  word: Word;
  constructor() {}

  ngOnInit() {}
}
