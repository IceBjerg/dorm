import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OwnRoomComponent} from './components/own-room/own-room.component';
import {RouterModule} from '@angular/router';

const routes = [
  {
    path: 'own-room',
    component: OwnRoomComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
