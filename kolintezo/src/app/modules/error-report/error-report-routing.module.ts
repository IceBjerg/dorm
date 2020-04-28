import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorReportComponent } from './error-report.component';

const routes: Routes = [{ path: '', component: ErrorReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorReportRoutingModule { }
