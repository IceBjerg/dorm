import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {AuthService} from './auth.service';
import {RotateService} from './rotate.service';

// don't use both or + and on the same object!
export interface Logical {
    or?: Logical[] | number[];
    and?: Logical[] | number[];
}

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    private permissions: { [key: string]: Logical};

    constructor(private configService: ConfigService, private authService: AuthService, private rotateService: RotateService) {
        this.permissions = {
            'register': { and: [1] },
            'own-room': { and: [0] },
            'main': {},
            'users': { and: [1] },
            'rooms': { and: [2] },
            'room-assign': { and: [3] },
            'permissions': { and: [4] },
            'error-report': {
                or: [0]
            },
            'translate': { and: [5] },
            'maintenance': { or: [6]},
            'guests': { or: [7]},
            'events-add': { and: [0]},
            'events-view': { and: [8]},
            'events-approve': {or: [9, 10]},
            'keys': {or: [7]}
        };
    }

    get perms(): { [key: string]: Logical} {
        return this.permissions;
    }

    set perms(newPerms: { [key: string]: Logical}) {
        this.permissions = newPerms;
    }

    getPermissions(route: string): Logical {
        if (this.permissions.hasOwnProperty(route)) {
            return this.permissions[route];
        }
        return {};
    }

    private _canAccess(perms: Logical, userPerms: number[]) {
        if (perms.or) {
            for (const value of perms.or) {
                if (typeof value === 'number') {
                    // numbers
                    if (userPerms.includes(value)) {
                        return true;
                    }
                } else {
                    // Logical
                    if (this._canAccess(value, userPerms)) {
                        return true;
                    }
                }
            }
            return false;
        } else if (perms.and) {
            let ret = true;
            for (const value of perms.and) {
                if (typeof value === 'number') {
                    ret = ret && userPerms.includes(value);
                } else {
                    ret = ret && this._canAccess(value, userPerms);
                }
            }
            return ret;
        }
        return true;
    }

    canAccess(route: string, userPermissions: any[]): boolean {
        return this._canAccess(this.getPermissions(route), userPermissions);
    }


    async getAllPermissions() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getAllPermissions';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async savePermissions(res: { add: { user: string; permission: number }[]; delete: { user: string; permission: number }[] }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/updatePermissions';
            return (await this.authService.sendAuthorizedRequest('POST', url, res, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }
}
