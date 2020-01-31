import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.afUser$.pipe(
      // 値をtrue or false にしてる
      map(user => !user),
      // 値を受け取ってなにかする
      tap(isGuest => {
        // もしguestでなければ
        if (!isGuest) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afUser$.pipe(
      // 値をtrue or false にしてる
      map(user => !user),
      take(1),
      tap(isGuest => {
        // もしguestでなければ
        if (!isGuest) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
