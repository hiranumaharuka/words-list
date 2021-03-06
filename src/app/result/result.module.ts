import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result/result.component';
import { NgAisModule } from 'angular-instantsearch';
import { SearchInputComponent } from './search-input/search-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SegmentedControlComponent } from './segmented-control/segmented-control.component';
import { VocabularyResultComponent } from './vocabulary-result/vocabulary-result.component';
import { WordResultComponent } from './word-result/word-result.component';
import { SharedModule } from '../shared/shared.module';
import { ViewDirective } from './view.directive';

@NgModule({
  declarations: [
    ResultComponent,
    SearchInputComponent,
    SegmentedControlComponent,
    VocabularyResultComponent,
    WordResultComponent,
    ViewDirective
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    NgAisModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class ResultModule {}
