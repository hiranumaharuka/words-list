import { Component, OnInit } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  vocabulary: Vocabulary = {
    title: '英単語帳',
    description: '簡単な英単語まとめました',
    user: 'ダミーたろう'
  };
  constructor() {}

  ngOnInit() {}
}
