import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorReportRoutingModule } from './error-report-routing.module';
import { ErrorReportComponent } from './error-report.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [ErrorReportComponent],
    imports: [
        CommonModule,
        ErrorReportRoutingModule,
        SharedModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule
    ]
})
export class ErrorReportModule { }
