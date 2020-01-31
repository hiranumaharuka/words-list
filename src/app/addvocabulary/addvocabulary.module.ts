import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddvocabularyRoutingModule } from './addvocabulary-routing.module';
import { AddvocabularyComponent } from './addvocabulary/addvocabulary.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddvocabularyComponent],
  imports: [CommonModule, AddvocabularyRoutingModule, SharedModule]
})
export class AddvocabularyModule {}
