import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import {SharedModule} from '../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { RoomEditComponent } from './components/room-edit/room-edit.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RoomNewComponent } from './components/room-new/room-new.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [RoomsComponent, RoomEditComponent, RoomNewComponent],
    imports: [
        CommonModule,
        RoomsRoutingModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule
    ]
})
export class RoomsModule { }
