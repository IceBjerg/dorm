import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsAddRoutingModule } from './events-add-routing.module';
import { EventsAddComponent } from './events-add.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [EventsAddComponent],
    imports: [
        CommonModule,
        EventsAddRoutingModule,
        MatCardModule,
        SharedModule,
        MatButtonModule
    ]
})
export class EventsAddModule { }
