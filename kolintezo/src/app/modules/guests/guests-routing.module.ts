import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GuestsComponent} from './guests.component';
import {NewGuestComponent} from './components/new-guest/new-guest.component';

const routes: Routes = [
    {
        path: '',
        component: GuestsComponent
    },
    {
        path: 'new',
        component: NewGuestComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuestsRoutingModule {
}
