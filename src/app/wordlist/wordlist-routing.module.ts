import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordlistComponent } from './wordlist/wordlist.component';

const routes: Routes = [
  {
    path: '',
    component: WordlistComponent
  },
  {
    path: ':vocabularyId',
    component: WordlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordlistRoutingModule {}
