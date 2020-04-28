import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsApproveRoutingModule } from './events-approve-routing.module';
import { EventsApproveComponent } from './events-approve.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [EventsApproveComponent],
    imports: [
        CommonModule,
        EventsApproveRoutingModule,
        SharedModule
    ]
})
export class EventsApproveModule { }
