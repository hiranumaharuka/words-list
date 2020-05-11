import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BillingDialogComponent } from 'src/app/billing-dialog/billing-dialog.component';
import { Observable } from 'rxjs';
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
export class BillingComponent implements OnInit {
  uid = this.authService.uid;
  isCustomer$: Observable<boolean> = this.vocabularyService
    .getUser(this.uid)
    .pipe(map(data => data.isCustomer));
  customerData$: Observable<Customer> = this.paymentService.getCustomer(
    this.uid
  );
  constructor(
    private dialog: MatDialog,
    private vocabularyService: VocabularyService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {}

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
}
