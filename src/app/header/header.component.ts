import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // user$は最新のuserが入る箱
  user$ = this.authService.afUser$;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  logout() {
    // authServieの中のログアウト関数を呼ぶ
    this.authService.logout();
  }
}
