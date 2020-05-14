import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private fns: AngularFireFunctions,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  deleteUserData(data) {
    this.loadingService.toggleLoading(true);
    const callable = this.fns.httpsCallable('deleteUserData');
    return callable(data)
      .toPromise()
      .then(() => this.loadingService.toggleLoading(false))
      .then(() => this.authService.logout());
  }
}
