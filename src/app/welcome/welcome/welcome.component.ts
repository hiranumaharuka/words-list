import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/header/header.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  constructor(
    // 外部サービスを自分のコンポーネントで使えるようにする
    private authService: AuthService,
    private header: HeaderService
  ) {}

  ngOnInit() {
    this.header.hide();
  }
  ngOnDestroy() {
    this.header.show();
  }

  login() {
    // authServieの中のログイン関数を呼ぶ
    this.authService.login();
  }
}
