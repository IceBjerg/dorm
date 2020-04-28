import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsComponent } from './rooms.component';
import {RoomEditComponent} from './components/room-edit/room-edit.component';
import {RoomNewComponent} from './components/room-new/room-new.component';

const routes: Routes = [
    {
      path: '',
      component: RoomsComponent
    },
    {
        path: 'new',
        component: RoomNewComponent
    },
    {
      path: ':id',
      component: RoomEditComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
