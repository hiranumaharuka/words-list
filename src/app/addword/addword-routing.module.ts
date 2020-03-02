import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddwordComponent } from './addword/addword.component';

const routes: Routes = [
  {
    path: '',
    component: AddwordComponent
  },
  {
    path: 'wordlist/:vocabularyId/addword',
    component: AddwordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddwordRoutingModule {}
