import { Component, OnInit, OnDestroy } from '@angular/core';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/vocabulary';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  uid: string = this.authService.uid;
  user$: Observable<User> = this.vocabularyService.getUser(this.uid);
  vocabularyIds;
  wordId: string;
  date: number;
  startDate$: Observable<number> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.startDate));
  endDate$: Observable<number> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.endDate));
  startDate;
  endDate;
  sub: Subscription;
  constructor(
    private vocabularyService: VocabularyService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.sub = this.startDate$.subscribe(data => {
      if (data !== null) {
        this.date = data;
        this.startDate = new Date(this.date * 1000);
      }
    });
    this.sub = this.endDate$.subscribe(data => {
      if (data !== null) {
        this.date = data;
        this.endDate = new Date(this.date * 1000);
      }
    });
  }

  delete() {
    this.userService.deleteUserData(this.uid);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
