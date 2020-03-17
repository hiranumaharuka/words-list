import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordComponent } from './word/word.component';

const routes: Routes = [
  {
    path: '',
    component: WordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
