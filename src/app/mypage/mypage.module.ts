import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypageRoutingModule } from './mypage-routing.module';
import { MaypageComponent } from './maypage/maypage.component';


@NgModule({
  declarations: [MaypageComponent],
  imports: [
    CommonModule,
    MypageRoutingModule
  ]
})
export class MypageModule { }
