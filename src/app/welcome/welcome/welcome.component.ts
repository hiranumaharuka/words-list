import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    // 外部サービスを自分のコンポーネントで使えるようにする
    private authService: AuthService
  ) {}

  ngOnInit() {}

  login() {
    // authServieの中のログイン関数を呼ぶ
    this.authService.login();
  }
}
