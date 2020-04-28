import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterPageRoutingModule} from './register-page-routing.module';
import {RegisterPageComponent} from './register-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [RegisterPageComponent],
    imports: [
        CommonModule,
        RegisterPageRoutingModule,
        MatCardModule,
        MatDividerModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatDialogModule,
        MatSnackBarModule,
        SharedModule
    ]
})
export class RegisterPageModule {
}
