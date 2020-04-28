import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeysRoutingModule } from './keys-routing.module';
import { KeysComponent } from './keys.component';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [KeysComponent],
    imports: [
        CommonModule,
        KeysRoutingModule,
        SharedModule,
        MatButtonModule,
        MatDialogModule
    ]
})
export class KeysModule { }
