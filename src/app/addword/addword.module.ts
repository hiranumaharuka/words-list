import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddwordRoutingModule } from './addword-routing.module';
import { AddwordComponent } from './addword/addword.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddwordComponent],
  imports: [CommonModule, AddwordRoutingModule, SharedModule]
})
export class AddwordModule {}
