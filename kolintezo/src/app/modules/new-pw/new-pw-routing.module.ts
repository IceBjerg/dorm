import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPwComponent } from './new-pw.component';

const routes: Routes = [{ path: '', component: NewPwComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPwRoutingModule { }
