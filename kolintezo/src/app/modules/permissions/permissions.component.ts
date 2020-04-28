import {Component, OnInit} from '@angular/core';
import {PermissionService} from '../../services/permission.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

@Component({
    selector: 'app-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

    public allPerms: number[];
    public userPermissions: UserPermissions[];
    public initialUserPermissions: UserPermissions[];

    displayedColumns: any[];
    dataSource = new MatTableDataSource([]);

    constructor(private permissionService: PermissionService, private noticeService: NoticeService) {
    }

    ngOnInit(): void {
        this.initData();
    }

    private async initData() {
        const tmp = await this.permissionService.getAllPermissions() as any;
        this.allPerms = tmp.permissions;
        tmp.userPermissions.forEach(item => {
            const perms = [];
            const strArr = item.permissions !== '' ? item.permissions.split(',') : [];
            strArr.forEach((stritem) => perms.push(parseInt(stritem, 10)));
            item.permissions = perms;
        });
        this.initialUserPermissions = tmp.userPermissions;

        const stringPerms = [];
        this.allPerms.forEach((val) => stringPerms.push(val.toString()));
        this.displayedColumns = ['name', ...stringPerms];
        this.cancel();
    }

    isNumber(column: any) {
        return !isNaN(column);
    }

    getTranslateId(column: string) {
        switch (column) {
            case 'name':
                return 'USER.NAME';
            default:
                return 'PERMISSION.PERMISSION' + column;
        }
    }

    hasPermission(user: UserPermissions, column: string) {
        return user.permissions.includes(parseInt(column, 10));
    }

    onChange($event: MatSlideToggleChange, row: UserPermissions, column: any) {
        // add
        if ($event.checked) {
            row.permissions.push(parseInt(column, 10));
        } else {
            const idx = row.permissions.findIndex(num => num === parseInt(column, 10));
            row.permissions.splice(idx, 1);
        }
        row.permissions.sort();
    }

    arrayEquals(array1: UserPermissions[], array2: UserPermissions[]) {
        if (array1 === array2) {
            return true;
        }
        if (array1 == null || array2 == null) {
            return false;
        }
        if (array1.length !== array2.length) {
            return false;
        }
        // permissions are sorted (on change)
        for (let i = 0; i < array1.length; ++i) {
            if (array1[i].permissions.length !== array2[i].permissions.length) { return false; }
            for (let j = 0; j < array1[i].permissions.length; j++) {
                if (array1[i].permissions[j] !== array2[i].permissions[j]) {
                    return false;
                }
            }
        }
        return true;
    }

    cancel() {
        this.userPermissions = JSON.parse(JSON.stringify(this.initialUserPermissions));
        this.dataSource.data = this.userPermissions;
    }

    async save() {
        const res: {
            add: { user: string, permission: number }[],
            delete: { user: string, permission: number }[],
        } = { add: [], delete: [] };
        for (let i = 0; i < this.userPermissions.length; i++) {
            // deletion
            this.initialUserPermissions[i].permissions.forEach( item => {
                if (!this.userPermissions[i].permissions.some( it => it === item)) {
                    res.delete.push({
                        permission: item,
                        user: this.userPermissions[i].id
                    });
                }
            });

            // addition
            this.userPermissions[i].permissions.forEach( item => {
                if (!this.initialUserPermissions[i].permissions.some( it => it === item))  {
                    res.add.push({
                        permission: item,
                        user: this.userPermissions[i].id
                    });
                }
            });
        }

        try {
            await this.permissionService.savePermissions(res);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    yesText: 'ACTIONS.HIDE',
                    content: 'PERMISSION.SAVE.SUCC',
                    title: 'success'
                }
            });
            this.initData();
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    yesText: 'ACTIONS.HIDE',
                    content: 'PERMISSION.SAVE.ERR',
                    title: 'error'
                }
            });
        }
    }
}

export interface UserPermissions {
    name: string;
    id: string;
    email: string;
    permissions: number[];
}
