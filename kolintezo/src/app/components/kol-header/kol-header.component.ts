import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MenuItemModel} from '../../interfaces/menu.item.model';
import {MatSidenav} from '@angular/material/sidenav';
import {RotateService} from '../../services/rotate.service';
import {Router, RouterOutlet} from '@angular/router';
import {MenuTreeComponent} from './menu-tree/menu-tree.component';
import {UserService} from '../../services/user.service';
import {PermissionService} from '../../services/permission.service';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-kol-header',
    templateUrl: './kol-header.component.html',
    styleUrls: ['./kol-header.component.scss'],
    animations: [
        trigger('routerAnimations', [
            transition('* <=> *', [
                query(':enter', [
                    style({
                        position: 'absolute',
                        width: '100%',
                        left: '-100%'
                    })
                ], {optional: true}),
                query(':leave', [
                    style({
                        position: 'absolute',
                        width: '100%',
                        left: 0,
                    })
                ], {optional: true}),
                query(':leave', [
                    animate('300ms cubic-bezier(1,0,0,1)',
                        style({
                            left: '100%'
                        })
                    )
                ], {optional: true}),
                query(':enter', [
                    animate('300ms cubic-bezier(1,0,0,1)',
                        style({
                            left: 0
                        })
                    )
                ], {optional: true})
            ])
        ])
    ]
})
export class KolHeaderComponent implements OnInit {
    @Input() innerWidth: number;
    @ViewChild('snav') snav: MatSidenav;
    @ViewChild('tree') tree: MenuTreeComponent;

    @Input() menu: MenuItemModel;
    public rotating = true;
    public accessibleMenu: MenuItemModel;

    public languages = ['hu', 'en'];
    public lang: string;

    constructor(public authService: AuthService, public rotateService: RotateService, private router: Router,
                private userService: UserService, private permissionService: PermissionService, private ref: ChangeDetectorRef, public translator: TranslateService) {
    }

    ngOnInit(): void {
        this.authService.expireToken.subscribe( (res) => {
            if (res === true) {
                this.logout();
            }
        });
        const storedLang = localStorage.getItem('lang');
        if (storedLang && this.languages.includes(storedLang)) {
            this.translator.setDefaultLang(storedLang);
            this.translator.use(storedLang);
            this.lang = storedLang;
        } else {
            this.translator.setDefaultLang(this.languages[0]);
            this.translator.use(this.languages[0]);
            this.lang = this.languages[0];
        }
        this.translator.onLangChange.subscribe( (res) => {
                localStorage.setItem('lang', this.translator.currentLang);
                this.lang = this.translator.currentLang;
            }
        );
        this.rotateService.emitter.subscribe( (status) => {
            this.rotating = status;
            this.ref.detectChanges();
        });
        this.userService.emitter.subscribe( () => this.reloadMenu());
        this.reloadMenu();
    }

    reloadMenu() {
        this.accessibleMenu = this.getAccessibleMenuItem(this.menu);
    }

    async logout() {
        this.authService.logout();
        if (this.snav && this.snav.opened) {
            await this.snav.close();
        }
        this.router.navigateByUrl('login');
    }


    getAccessibleMenuItem(menu: MenuItemModel) {
        const retMenu: MenuItemModel = {
            translateId: menu.translateId,
            path: menu.path,
            icon: menu.icon,
            isExpanded: menu.isExpanded,
            innerItems: []
        };

        for (let childItem of menu.innerItems) {
            if (childItem.innerItems.length > 0) {
                childItem = this.getAccessibleMenuItem(childItem);
                if (childItem.innerItems.length > 0) {
                    retMenu.innerItems.push(childItem);
                }
            } else {
                if (this.permissionService.canAccess(childItem.path, this.userService.getUser()?.permissions ?? [])) {
                    retMenu.innerItems.push(childItem);
                }
            }
        }
        return retMenu;
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData;
    }

    changeLang($event) {
        const nextLang = $event.value;
        const idx = this.languages.findIndex( lang => lang === nextLang);
        this.translator.use(this.languages[idx]);
    }
}
