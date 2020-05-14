import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BillingDialogComponent } from 'src/app/billing-dialog/billing-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { ChangeDialogComponent } from 'src/app/change-dialog/change-dialog.component';
import { PaymentService } from 'src/app/services/payment.service';
import { Customer } from 'src/app/interfaces/vocabulary';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit, OnDestroy {
  uid = this.authService.uid;
  date: number;
  startDate$: Observable<number> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.startDate));
  endDate$: Observable<number> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.endDate));
  startDate;
  endDate;
  isCustomer$: Observable<boolean> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.isCustomer));
  customerData$: Observable<Customer> = this.paymentService.getCustomer(
    this.uid
  );
  sub: Subscription;
  constructor(
    private dialog: MatDialog,
    private vocabularyService: VocabularyService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.sub = this.startDate$.subscribe(data => {
      this.date = data;
      this.startDate = new Date(this.date * 1000);
    });
    this.sub = this.endDate$.subscribe(data => {
      this.date = data;
      this.endDate = new Date(this.date * 1000);
    });
  }

  openSubscribeDialog() {
    this.dialog.open(BillingDialogComponent, {
      width: '640px',
      autoFocus: false,
      restoreFocus: false
    });
  }

  openChangeDialog() {
    this.dialog.open(ChangeDialogComponent, {
      width: '640px',
      autoFocus: false,
      restoreFocus: false
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
