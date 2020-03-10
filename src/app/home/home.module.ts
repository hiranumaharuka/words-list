import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PopularvocabularyComponent } from './popularvocabulary/popularvocabulary.component';
import { LatestvocabularyComponent } from './latestvocabulary/latestvocabulary.component';

@NgModule({
  declarations: [
    HomeComponent,
    PopularvocabularyComponent,
    LatestvocabularyComponent
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule]
})
export class HomeModule {}
