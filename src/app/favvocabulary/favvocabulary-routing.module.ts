import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavvocabularyComponent } from './favvocabulary/favvocabulary.component';

const routes: Routes = [
  {
    path: '',
    component: FavvocabularyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavvocabularyRoutingModule {}
