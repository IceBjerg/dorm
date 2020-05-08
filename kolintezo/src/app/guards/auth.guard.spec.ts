import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import Spy = jasmine.Spy;

describe('AuthGuard', () => {
    let guard: AuthGuard;

    let authService: AuthService;
    let authSpy: Spy;
    let router: Router;
    let routerSpy: Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        guard = TestBed.inject(AuthGuard);
    });

    beforeEach( () => {
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        routerSpy = spyOn(router, 'navigateByUrl').and.callFake( async () => true);
    });


    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should call AuthService for info', () => {
        authSpy = spyOn(authService, 'isLoggedIn').and.returnValue(false);
        guard.canActivate(null, null);
        expect(authSpy).toHaveBeenCalled();
    });

    it('navigate to login page if not logged in', () => {
        authSpy = spyOn(authService, 'isLoggedIn').and.returnValue(false);
        guard.canActivate(null, null);
        expect(routerSpy).toHaveBeenCalledWith('login');
    });

    it('should not redirect if logged in', () => {
        authSpy = spyOn(authService, 'isLoggedIn').and.returnValue(true);
        guard.canActivate(null, null);
        expect(routerSpy).not.toHaveBeenCalled();
    });
});
