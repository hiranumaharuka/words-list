import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsofsaleComponent } from './termsofsale/termsofsale.component';


const routes: Routes = [
  {
    path: '',
    component: TermsofsaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsofsaleRoutingModule { }
