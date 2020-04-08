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
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SegmentedControlComponent } from './segmented-control/segmented-control.component';

@NgModule({
  declarations: [
    ResultComponent,
    SearchInputComponent,
    SegmentedControlComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    NgAisModule.forRoot(),
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatInputModule
  ]
})
export class ResultModule {}
