import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordlistRoutingModule } from './wordlist-routing.module';
import { WordlistComponent } from './wordlist/wordlist.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WordlistComponent],
  imports: [CommonModule, WordlistRoutingModule, SharedModule]
})
export class WordlistModule {}
