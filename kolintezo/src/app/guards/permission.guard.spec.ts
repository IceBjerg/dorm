import {TestBed} from '@angular/core/testing';

import {PermissionGuard} from './permission.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {PermissionService} from '../services/permission.service';
import Spy = jasmine.Spy;
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

describe('PermissionGuard', () => {
    let guard: PermissionGuard;

    let permissionService: PermissionService;
    let router: Router;
    let routerSpy: Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        guard = TestBed.inject(PermissionGuard);
    });

    beforeEach( () => {
        permissionService = TestBed.inject(PermissionService);
        const userService = TestBed.inject(UserService);
        spyOn(userService, 'getUser').and.returnValue({permissions: []});
        router = TestBed.inject(Router);
        routerSpy = spyOn(router, 'navigateByUrl').and.callFake( async () => true);
    });


    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should call Permission Service', () => {
        const spyPerm = spyOn(permissionService, 'canAccess').and.returnValue(true);
        guard.canLoad({path: 'test'}, []);
        expect(spyPerm).toHaveBeenCalled();
    });

    it('should redirect if no permission', () => {
        const spyPerm = spyOn(permissionService, 'canAccess').and.returnValue(false);
        guard.canLoad({path: 'test'}, []);
        expect(routerSpy).toHaveBeenCalledWith('main');
    });

    it('should not redirect in case I have permission', () => {
        const spyPerm = spyOn(permissionService, 'canAccess').and.returnValue(true);
        guard.canLoad({path: 'test'}, []);
        expect(routerSpy).not.toHaveBeenCalled();
    });
});
