import { Component, OnInit } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';

@Component({
  selector: 'app-favvocabulary',
  templateUrl: './favvocabulary.component.html',
  styleUrls: ['./favvocabulary.component.scss']
})
export class FavvocabularyComponent implements OnInit {
  vocabulary: Vocabulary = {
    title: '英単語帳',
    description: '簡単な英単語まとめました',
    user: 'ダミーたろう'
  };
  constructor() {}

  ngOnInit() {}
}
