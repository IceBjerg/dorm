import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [MaintenanceComponent],
    imports: [
        CommonModule,
        MaintenanceRoutingModule,
        SharedModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class MaintenanceModule { }
