import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyvocabularyComponent } from './myvocabulary/myvocabulary.component';

const routes: Routes = [
  {
    path: '',
    component: MyvocabularyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyvocabularyRoutingModule {}
