import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsofuseComponent } from './termsofuse/termsofuse.component';


const routes: Routes = [
  {
    path: '',
    component: TermsofuseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsofuseRoutingModule { }
