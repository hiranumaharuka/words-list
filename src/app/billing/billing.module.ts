import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing/billing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class BillingModule {}
