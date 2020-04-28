import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';
import { AddvocabularyRoutingModule } from './addvocabulary-routing.module';
import { AddvocabularyComponent } from './addvocabulary/addvocabulary.component';
import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material';
import { SearchtagsComponent } from './searchtags/searchtags.component';
@NgModule({
  declarations: [AddvocabularyComponent, SearchtagsComponent],
  imports: [
    CommonModule,
    AddvocabularyRoutingModule,
    SharedModule,
    NgAisModule,
    MatAutocompleteModule
  ]
})
export class AddvocabularyModule {}
