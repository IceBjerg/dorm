import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsAddComponent } from './events-add.component';

const routes: Routes = [{ path: '', component: EventsAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsAddRoutingModule { }
