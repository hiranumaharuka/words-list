import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact/contact.component';
import {
  MatButtonModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ContactModule { }
