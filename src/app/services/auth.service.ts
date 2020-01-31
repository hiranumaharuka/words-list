import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ログイン状態を取得する
  // afUser$はUserという型の最新状態が入ってくる変数
  afUser$: Observable<User> = this.afAuth.user;
  uid: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // afUser$を表示する
    this.afUser$.subscribe(user => {
      // userがいれば、いなければnull
      this.uid = user && user.uid;
    });
  }

  // 処理を書いていく
  login() {
    // afAuthを使ってログインする
    // signInWithPopupはpopupが開いてその中でログイする
    this.afAuth.auth
      .signInWithPopup(
        // googleでログインする
        new auth.GoogleAuthProvider()
      )
      .then(() => this.router.navigateByUrl('/'));
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigateByUrl('/welcome'));
  }
}
