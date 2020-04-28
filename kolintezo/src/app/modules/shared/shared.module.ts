import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import {RoomNameComponent} from './components/room-name/room-name.component';
import {UserFullNameComponent} from './components/user-full-name/user-full-name.component';
import {UserEmailComponent} from './components/user-email/user-email.component';
import {UserNeptunComponent} from './components/user-neptun/user-neptun.component';
import {UserPasswordComponent} from './components/user-password/user-password.component';
import {UserPasswordAgainComponent} from './components/user-password-again/user-password-again.component';
import {UserNationalityComponent} from './components/user-nationality/user-nationality.component';
import { UserGenderComponent } from './components/user-gender/user-gender.component';
import { RoomBuildingComponent } from './components/room-building/room-building.component';
import { RoomFloorComponent } from './components/room-floor/room-floor.component';
import { RoomCapacityComponent } from './components/room-capacity/room-capacity.component';
import { RoomIdComponent } from './components/room-id/room-id.component';
import { ReportTypeComponent } from './components/report-type/report-type.component';
import { ReportLocComponent } from './components/report-loc/report-loc.component';
import { ReportTextComponent } from './components/report-text/report-text.component';
import { ReportNeedTranslateComponent } from './components/report-need-translate/report-need-translate.component';
import { GuestHostIdComponent } from './components/guest-host-id/guest-host-id.component';
import { GuestGuestNameComponent } from './components/guest-guest-name/guest-guest-name.component';
import { GuestGuestIdComponent } from './components/guest-guest-id/guest-guest-id.component';
import { BasicTextInputComponent } from './components/basic-text-input/basic-text-input.component';
import { BasicTextareaComponent } from './components/basic-textarea/basic-textarea.component';
import { EventHistoryComponent } from './components/event-history/event-history.component';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import { KeysTableComponent } from './components/keys-table/keys-table.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
    declarations: [
        RoomNameComponent,
        UserFullNameComponent,
        UserEmailComponent,
        UserNeptunComponent,
        UserPasswordComponent,
        UserPasswordAgainComponent,
        UserNationalityComponent,
        UserGenderComponent,
        RoomBuildingComponent,
        RoomFloorComponent,
        RoomCapacityComponent,
        RoomIdComponent,
        ReportTypeComponent,
        ReportLocComponent,
        ReportTextComponent,
        ReportNeedTranslateComponent,
        GuestHostIdComponent,
        GuestGuestNameComponent,
        GuestGuestIdComponent,
        BasicTextInputComponent,
        BasicTextareaComponent,
        EventHistoryComponent,
        KeysTableComponent,
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatSelectModule,
        TranslateModule.forChild(),
        MatTableModule,
        MatDividerModule,
        MatListModule,
        FormsModule
    ],
    exports: [
        TranslateModule,
        RoomNameComponent,
        UserFullNameComponent,
        UserPasswordComponent,
        UserPasswordAgainComponent,
        UserNeptunComponent,
        UserEmailComponent,
        UserGenderComponent,
        UserNationalityComponent,
        RoomBuildingComponent,
        RoomFloorComponent,
        RoomCapacityComponent,
        RoomIdComponent,
        ReportTypeComponent,
        ReportLocComponent,
        ReportTextComponent,
        ReportNeedTranslateComponent,
        GuestHostIdComponent,
        GuestGuestNameComponent,
        GuestGuestIdComponent,
        BasicTextInputComponent,
        BasicTextareaComponent,
        EventHistoryComponent,
        KeysTableComponent
    ]
})
export class SharedModule {
}
