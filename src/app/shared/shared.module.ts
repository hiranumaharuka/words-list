import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
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
