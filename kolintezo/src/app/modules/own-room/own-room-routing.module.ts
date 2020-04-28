import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnRoomComponent } from './own-room.component';

const routes: Routes = [{ path: '', component: OwnRoomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnRoomRoutingModule { }
