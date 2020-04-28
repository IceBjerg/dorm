import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestsRoutingModule } from './guests-routing.module';
import { GuestsComponent } from './guests.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { NewGuestComponent } from './components/new-guest/new-guest.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../shared/shared.module';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [GuestsComponent, NewGuestComponent],
    imports: [
        CommonModule,
        GuestsRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        SharedModule,
        MatInputModule,
    ]
})
export class GuestsModule { }
