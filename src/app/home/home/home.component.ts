import { Component, OnInit } from '@angular/core';
import { Popularwordbook } from 'src/app/interfaces/popularwordbook';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularwordbook: Popularwordbook = {
    title: '英単語帳',
    description: '簡単な英単語まとめました',
    user: 'ダミーたろう'
  };
  constructor() { }

  ngOnInit() {
  }

}
