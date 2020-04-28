import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) {
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        while (this.authService.isLoggedIn() === undefined) {
            await this.delay(100);
        }
        if (this.authService.isLoggedIn() === false) {
            return true;
        } else {
            this.router.navigateByUrl('main');
            return false;
        }
    }

    async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
        return await this.canActivate(null, null);
    }
}
