import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavvocabularyRoutingModule } from './favvocabulary-routing.module';
import { FavvocabularyComponent } from './favvocabulary/favvocabulary.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FavvocabularyComponent],
  imports: [CommonModule, FavvocabularyRoutingModule, SharedModule]
})
export class FavvocabularyModule {}
