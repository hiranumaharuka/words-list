import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularwordbookComponent } from './popularwordbook/popularwordbook.component';
import {
  MatIconModule,
  MatButtonModule,
} from '@angular/material';



@NgModule({
  declarations: [
    PopularwordbookComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    PopularwordbookComponent,
    MatIconModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
