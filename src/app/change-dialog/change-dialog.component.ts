import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { VocabularyService } from '../services/vocabulary.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-change-dialog',
  templateUrl: './change-dialog.component.html',
  styleUrls: ['./change-dialog.component.scss']
})
export class ChangeDialogComponent implements OnInit, OnDestroy {
  uid = this.authService.uid;
  isCustomer$: Observable<boolean> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.isCustomer));
  date: number;
  endDate$: Observable<number> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.endDate));
  endDate;
  sub: Subscription;
  constructor(
    private paymentService: PaymentService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private vocabularyService: VocabularyService
  ) {}

  ngOnInit() {
    this.sub = this.endDate$.subscribe(data => {
      this.date = data;
      this.endDate = new Date(this.date * 1000);
    });
  }

  stopSubscribe() {
    this.paymentService
      .unsubscribePlan({
        userId: this.uid
      })
      .then(() => {
        this.snackBar.open('月額プランを解約しました。', null, {
          duration: 1000
        });
      })
      .catch(err => {
        this.snackBar.open('月額プランの解約に失敗しました', null, {
          duration: 1000
        });
      });
  }

  subscribe() {
    this.paymentService.getCustomer(this.uid).subscribe(customer => {
      if (customer.customerId) {
        this.paymentService
          .subscribePlan({
            customerId: customer.customerId
          })
          .then(() => {
            this.snackBar.open('月額プランの登録完了しました', null, {
              duration: 1000
            });
          })
          .catch(err => {
            this.snackBar.open('月額プランの登録に失敗しました', null, {
              duration: 1000
            });
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
