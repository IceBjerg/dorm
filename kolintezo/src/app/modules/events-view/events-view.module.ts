import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsViewRoutingModule } from './events-view-routing.module';
import { EventsViewComponent } from './events-view.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [EventsViewComponent],
    imports: [
        CommonModule,
        EventsViewRoutingModule,
        SharedModule
    ]
})
export class EventsViewModule { }
