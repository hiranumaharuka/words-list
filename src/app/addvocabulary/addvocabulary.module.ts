import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddvocabularyRoutingModule } from './addvocabulary-routing.module';
import { AddvocabularyComponent } from './addvocabulary/addvocabulary.component';


@NgModule({
  declarations: [AddvocabularyComponent],
  imports: [
    CommonModule,
    AddvocabularyRoutingModule
  ]
})
export class AddvocabularyModule { }
