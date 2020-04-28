import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {SharedModule} from '../shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [PermissionsComponent],
    imports: [
        CommonModule,
        PermissionsRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatDividerModule,
        SharedModule,
        MatCheckboxModule,
        MatSlideToggleModule,
    ]
})
export class PermissionsModule { }
