import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ログイン状態を取得する
  // afUser$はUserという型の最新状態が入ってくる変数
  afUser$: Observable<User> = this.afAuth.user;
  uid: string;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // afUser$を表示する
    this.afUser$.subscribe(user => {
      // userがいれば、いなければnull
      this.uid = user && user.uid;
    });
  }

  // 処理を書いていく
  async login() {
    // afAuthを使ってログインする
    // signInWithPopupはpopupが開いてその中でログイする
    await this.afAuth.auth.signInWithPopup(
      // googleでログインする
      new auth.GoogleAuthProvider()
    );
    this.router.navigateByUrl('/').then(() => {
      this.snackBar.open('ログインしました', null, { duration: 1000 });
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null, { duration: 1000 });
    });
    this.router.navigateByUrl('/welcome');
  }
}
