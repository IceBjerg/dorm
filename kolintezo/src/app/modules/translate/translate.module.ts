import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateRoutingModule } from './translate-routing.module';
import { TranslateComponent } from './translate.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [TranslateComponent],
    imports: [
        CommonModule,
        TranslateRoutingModule,
        MatCardModule,
        SharedModule,
        MatDividerModule,
        MatButtonModule
    ]
})
export class TranslateModule { }
