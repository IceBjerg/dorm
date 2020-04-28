import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {PermissionGuard} from './guards/permission.guard';
import {LoggedOutGuard} from './guards/logged-out.guard';

const routes: Routes = [
    {
        path: 'own-room',
        loadChildren: () => import('./modules/own-room/own-room.module').then(m => m.OwnRoomModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'main',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'register',
        loadChildren: () => import('./modules/register-page/register-page.module').then(m => m.RegisterPageModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'rooms',
        loadChildren: () => import('./modules/rooms/rooms.module').then(m => m.RoomsModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'room-assign',
        loadChildren: () => import('./modules/room-assign/room-assign.module').then(m => m.RoomAssignModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'permissions',
        loadChildren: () => import('./modules/permissions/permissions.module').then(m => m.PermissionsModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'error-report',
        loadChildren: () => import('./modules/error-report/error-report.module').then(m => m.ErrorReportModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'translate',
        loadChildren: () => import('./modules/translate/translate.module').then(m => m.TranslateModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'maintenance',
        loadChildren: () => import('./modules/maintenance/maintenance.module').then(m => m.MaintenanceModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'guests',
        loadChildren: () => import('./modules/guests/guests.module').then(m => m.GuestsModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'events-add',
        loadChildren: () => import('./modules/events-add/events-add.module').then(m => m.EventsAddModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'events-view',
        loadChildren: () => import('./modules/events-view/events-view.module').then(m => m.EventsViewModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'events-approve',
        loadChildren: () => import('./modules/events-approve/events-approve.module').then(m => m.EventsApproveModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'keys',
        loadChildren: () => import('./modules/keys/keys.module').then(m => m.KeysModule),
        canActivate: [AuthGuard, PermissionGuard],
        canLoad: [AuthGuard, PermissionGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
        canActivate: [LoggedOutGuard],
        canLoad: [LoggedOutGuard]
    },
    {
        path: 'new-pw/:id',
        loadChildren: () => import('./modules/new-pw/new-pw.module').then(m => m.NewPwModule),
        canActivate: [LoggedOutGuard],
        canLoad: [LoggedOutGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
