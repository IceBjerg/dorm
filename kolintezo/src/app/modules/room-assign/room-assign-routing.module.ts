import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomAssignComponent } from './room-assign.component';

const routes: Routes = [{ path: '', component: RoomAssignComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomAssignRoutingModule { }
