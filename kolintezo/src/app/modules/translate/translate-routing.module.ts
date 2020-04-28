import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslateComponent } from './translate.component';

const routes: Routes = [{ path: '', component: TranslateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslateRoutingModule { }
