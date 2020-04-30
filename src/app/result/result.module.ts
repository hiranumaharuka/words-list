import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result/result.component';
import { NgAisModule } from 'angular-instantsearch';
import { SearchInputComponent } from './search-input/search-input.component';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SegmentedControlComponent } from './segmented-control/segmented-control.component';
import { VocabularyresultComponent } from './vocabularyresult/vocabularyresult.component';
import { WordresultComponent } from './wordresult/wordresult.component';
import { SharedModule } from '../shared/shared.module';
import { MergeuserPipe } from '../mergeuser.pipe';
import { ViewDirective } from './view.directive';

@NgModule({
  declarations: [
    ResultComponent,
    SearchInputComponent,
    SegmentedControlComponent,
    VocabularyresultComponent,
    WordresultComponent,
    MergeuserPipe,
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
    SharedModule
  ]
})
export class ResultModule {}
