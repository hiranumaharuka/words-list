import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BillingDialogComponent } from 'src/app/billing-dialog/billing-dialog.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    this.dialog.open(BillingDialogComponent, {
      width: '640px',
      autoFocus: false,
      restoreFocus: false,
      // ここでデータを渡す
      data: {
        name: 'taro',
        card: 123
      }
    });
  }
}
