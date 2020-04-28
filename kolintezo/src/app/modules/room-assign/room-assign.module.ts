import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomAssignRoutingModule } from './room-assign-routing.module';
import { RoomAssignComponent } from './room-assign.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TranslateModule} from '@ngx-translate/core';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RoomAssignComponent],
    imports: [
        CommonModule,
        RoomAssignRoutingModule,
        MatTableModule,
        MatSortModule,
        MatDividerModule,
        MatButtonModule,
        MatCheckboxModule,
        TranslateModule,
        MatListModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class RoomAssignModule { }
