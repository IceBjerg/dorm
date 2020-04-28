import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        SharedModule
    ]
})
export class LoginModule {
}
