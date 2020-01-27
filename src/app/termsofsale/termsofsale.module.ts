import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsofsaleRoutingModule } from './termsofsale-routing.module';
import { TermsofsaleComponent } from './termsofsale/termsofsale.component';



@NgModule({
  declarations: [TermsofsaleComponent],
  imports: [
    CommonModule,
    TermsofsaleRoutingModule,
  ]
})
export class TermsofsaleModule { }
