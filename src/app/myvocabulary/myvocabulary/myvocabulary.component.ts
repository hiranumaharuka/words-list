import { Component, OnInit } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';

@Component({
  selector: 'app-myvocabulary',
  templateUrl: './myvocabulary.component.html',
  styleUrls: ['./myvocabulary.component.scss']
})
export class MyvocabularyComponent implements OnInit {
  vocabulary: Vocabulary = {
    title: '英単語帳',
    description: '簡単な英単語まとめました',
    tag: 'TOEIC',
    user: 'ダミーたろう'
  };
  constructor() {}

  ngOnInit() {}
}
