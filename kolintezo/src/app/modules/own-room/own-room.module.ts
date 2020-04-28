import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnRoomRoutingModule } from './own-room-routing.module';
import { OwnRoomComponent } from './own-room.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [OwnRoomComponent],
  imports: [
    CommonModule,
    OwnRoomRoutingModule,
    MatCardModule,
    SharedModule
  ]
})
export class OwnRoomModule { }
