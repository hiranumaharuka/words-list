import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyvocabularyRoutingModule } from './myvocabulary-routing.module';
import { MyvocabularyComponent } from './myvocabulary/myvocabulary.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MyvocabularyComponent],
  imports: [CommonModule, MyvocabularyRoutingModule, SharedModule]
})
export class MyvocabularyModule {}
