import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsApproveComponent } from './events-approve.component';

const routes: Routes = [{ path: '', component: EventsApproveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsApproveRoutingModule { }
