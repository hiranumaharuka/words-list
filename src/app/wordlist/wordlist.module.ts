import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WordlistRoutingModule } from './wordlist-routing.module';
import { WordlistComponent } from './wordlist/wordlist.component';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CardComponent } from './card/card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [WordlistComponent, CardComponent],
  imports: [
    CommonModule,
    WordlistRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    SwiperModule,
    MatProgressBarModule
  ]
})
export class WordlistModule {}
