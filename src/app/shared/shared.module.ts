import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatMenuModule,
  MatChipsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordComponent } from './word/word.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [VocabularyComponent, WordComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    SharedRoutingModule,
    MatChipsModule
  ],
  exports: [
    VocabularyComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    WordComponent,
    MatCardModule,
    MatChipsModule
  ]
})
export class SharedModule {}
