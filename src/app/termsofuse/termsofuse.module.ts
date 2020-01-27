import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsofuseRoutingModule } from './termsofuse-routing.module';
import { TermsofuseComponent } from './termsofuse/termsofuse.component';


@NgModule({
  declarations: [TermsofuseComponent],
  imports: [
    CommonModule,
    TermsofuseRoutingModule
  ]
})
export class TermsofuseModule { }
