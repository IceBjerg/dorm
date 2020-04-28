import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatTableModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        CommonModule,
        SharedModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        FormsModule,
    ]
})
export class UsersModule { }
