import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSource = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSource.asObservable().pipe(shareReplay(1));

  constructor() {}

  toggleLoading(status: boolean) {
    setTimeout(() => this.loadingSource.next(status));
  }
}
