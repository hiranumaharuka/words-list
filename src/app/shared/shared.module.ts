import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import {
  MatIconModule,
  MatButtonModule,
} from '@angular/material';



@NgModule({
  declarations: [
    VocabularyComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    VocabularyComponent,
    MatIconModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
