import {Component, Input, OnInit} from '@angular/core';
import {MenuItemModel} from '../../../interfaces/menu.item.model';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {PermissionService} from '../../../services/permission.service';
import {UserService} from '../../../services/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-menu-tree',
    templateUrl: './menu-tree.component.html',
    styleUrls: ['./menu-tree.component.css'],
    animations: [
        // trigger('childrenExpanded', [
        //     transition(':enter', [
        //         style({ position: 'absolute', left: '-100%' }),
        //         animate('100ms', style({ left: 0 })),
        //     ]),
        //     transition(':leave', [
        //         style({ position: 'absolute', right: 0 }),
        //         animate('100ms', style({ right: '-100%' }))
        //     ])
        // ]),

        trigger('childrenExpanded', [
            state('collapsed, void', style({height: '0px', overflow: 'hidden'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ]
})
export class MenuTreeComponent implements OnInit {

    @Input() model: MenuItemModel;
    @Input() leftPadding: any;
    @Input() rightPadding: any;
    @Input() isPhone: boolean;
    @Input() sidenavcontainer: MatSidenavContainer;

    constructor(private router: Router) {
    }

    ngOnInit(): void {

    }

    getPadding() {
        return parseInt(this.leftPadding as string, 10) + 20;
    }

    public isSelected() {
        const url = this.router.url.substr(1);
        return this.model.path === url;
    }

    expandChange() {
        this.model.isExpanded = !this.model.isExpanded;
        setTimeout( () => this.sidenavcontainer.updateContentMargins(), 0);
        setTimeout( () => this.sidenavcontainer.updateContentMargins(), 250);
    }
}
