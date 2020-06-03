import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact/contact.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactRoutingModule, MatButtonModule, MatIconModule]
})
export class ContactModule {}
