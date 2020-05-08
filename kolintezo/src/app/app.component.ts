import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent} from '@angular/router';
import {RotateService} from './services/rotate.service';
import {MenuItemModel} from './interfaces/menu.item.model';
import {UserService} from './services/user.service';
import {KolNotification, KolNotificationType, NoticeService} from './services/notice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './components/dialog/dialog.component';
import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {ConfigService} from './services/config.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public inited = false;
    innerWidth: number;
    title = 'kolintezo'; // not in use
    menu: MenuItemModel = {
        translateId: '',
        isExpanded: true,
        path: '',
        innerItems: [
            {
                translateId: 'MENU.MAIN',
                isExpanded: true,
                path: 'main',
                icon: 'fas fa-home',
                innerItems: []
            },
            {
                translateId: 'MENU.OWN-ROOM',
                isExpanded: true,
                path: 'own-room',
                icon: 'fas fa-bed',
                innerItems: []
            },
            {
                translateId: 'MENU.ERROR-REPORT',
                isExpanded: false,
                path: 'error-report',
                icon: 'fas fa-exclamation-triangle',
                innerItems: []
            },
            {
                translateId: 'MENU.ADD-EVENT',
                isExpanded: false,
                path: 'events-add',
                icon: 'fas fa-calendar-plus',
                innerItems: []
            },
            {
                translateId: 'MENU.USER-MNG',
                isExpanded: false,
                path: '',
                icon: '',
                innerItems: [
                    {
                        translateId: 'MENU.REGISTER',
                        isExpanded: true,
                        path: 'register',
                        icon: 'fas fa-plus',
                        innerItems: []
                    },
                    {
                        translateId: 'MENU.USERS',
                        isExpanded: true,
                        path: 'users',
                        icon: 'fas fa-users',
                        innerItems: []
                    },
                    {
                        translateId: 'MENU.PERMISSIONS',
                        isExpanded: true,
                        path: 'permissions',
                        icon: 'fas fa-award',
                        innerItems: []
                    },
                ]
            },
            {
                translateId: 'MENU.ROOM-MNG',
                isExpanded: false,
                path: '',
                icon: '',
                innerItems: [
                    {
                        translateId: 'MENU.ROOMS',
                        isExpanded: true,
                        path: 'rooms',
                        icon: 'fas fa-door-open',
                        innerItems: []
                    },
                    {
                        translateId: 'MENU.ROOM-ASSIGNMENT',
                        isExpanded: true,
                        path: 'room-assign',
                        icon: 'fas fa-user-tag',
                        innerItems: []
                    },
                ]
            },
            {
                translateId: 'MENU.TASKS',
                isExpanded: false,
                path: '',
                icon: '',
                innerItems: [
                    {
                        translateId: 'MENU.TRANSLATE',
                        isExpanded: false,
                        path: 'translate',
                        icon: 'fas fa-comments',
                        innerItems: []
                    },
                    {
                        translateId: 'MENU.MAINTENANCE',
                        isExpanded: false,
                        path: 'maintenance',
                        icon: 'fas fa-tools',
                        innerItems: []
                    },
                    {
                        translateId: 'MENU.GUESTS',
                        isExpanded: false,
                        path: 'guests',
                        icon: 'fas fa-user-friends',
                        innerItems: []
                    },
                    {
                        translateId: 'MENU.EVENTS-VIEW',
                        isExpanded: false,
                        path: 'events-view',
                        icon: 'fas fa-calendar-alt',
                        innerItems: []
                    },
                    {
                        translateId: 'MENU.EVENTS-APPROVE',
                        isExpanded: false,
                        path: 'events-approve',
                        icon: 'fas fa-calendar-check',
                        innerItems: []
                    },
                    {
                        translateId: 'MENU.KEYS',
                        isExpanded: false,
                        path: 'keys',
                        icon: 'fas fa-key',
                        innerItems: []
                    },
                ]
            }
        ],
        icon: ''
    };

    constructor(public authService: AuthService, router: Router, rotateService: RotateService, private userService: UserService,
                private noticeService: NoticeService, private snackBar: MatSnackBar, private dialog: MatDialog, private configService: ConfigService) {
        // indicator for lazy loading items
        router.events.subscribe(
            (event: RouterEvent): void => {
                if (event instanceof RouteConfigLoadStart) {
                    rotateService.processStarted();
                } else if (event instanceof RouteConfigLoadEnd) {
                    rotateService.processEnded();
                }
            }
        );

        this.noticeService.events.subscribe(val => this.popupTriggered(val));
    }

    popupTriggered(noti: KolNotification) {
        switch (noti.type) {
            case KolNotificationType.SNACK_BAR:
                this.snackBar.openFromComponent(SnackbarComponent, {data: noti.message, duration: 4000
                });
                break;
            case KolNotificationType.DIALOG:
                this.dialog.open(DialogComponent,
                    {
                        width: '70vw',
                        data: noti.message
                    });
        }
    }


    ngOnInit() {
        this.initData();
    }

    async initData() {
        await this.configService.init();
        await this.authService.init();
        if (this.authService.isLoggedIn()) {
            await this.userService.init();
        }
        this.innerWidth = window.innerWidth;
        this.inited = true;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = event.target.innerWidth;
    }
}
