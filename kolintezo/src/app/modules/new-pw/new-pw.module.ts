import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPwRoutingModule } from './new-pw-routing.module';
import { NewPwComponent } from './new-pw.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [NewPwComponent],
    imports: [
        CommonModule,
        NewPwRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class NewPwModule { }
