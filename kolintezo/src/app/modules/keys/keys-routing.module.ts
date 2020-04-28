import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeysComponent } from './keys.component';

const routes: Routes = [{ path: '', component: KeysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeysRoutingModule { }
