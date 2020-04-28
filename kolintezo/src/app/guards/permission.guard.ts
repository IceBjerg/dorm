import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {PermissionService} from '../services/permission.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivate, CanLoad {

    constructor(private userService: UserService, private router: Router, private permissionService: PermissionService) {
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        if (next?.routeConfig.path) {
            return await this.canLoad(next?.routeConfig, null);
        }

    }

    async canLoad(
        route: Route,
        segments: UrlSegment[]): Promise<boolean> {
        while (!this.userService.getUser()) {
            await this.delay(100);
        }
        const ret = this.permissionService.canAccess(route.path, this.userService.getUser()?.permissions);
        if (!ret) {
            this.router.navigateByUrl('main');
        }
        return ret;
    }
}
