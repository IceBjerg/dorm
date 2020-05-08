import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(AuthService);
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue('');
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('login status should be undefined before init', () => {
        expect(service.isLoggedIn()).toBeUndefined();
    });

    it('should be logged out if no token in sessionStorage', async () => {
        await service.init();
        expect(service.isLoggedIn()).toBeFalse();
    });

    it('should be logged in if there is a token', async () => {
        localStorage.setItem('accessToken', 'tmp token used for testing purposes only');
        await service.init();
        expect(service.isLoggedIn()).toBeTrue();
    });

    it('should be able to successfully log out', async () => {
        localStorage.setItem('accessToken', 'tmp token used for testing purposes only');
        await service.init();
        expect(service.isLoggedIn()).toBeTrue();
        service.logout();
        expect(service.isLoggedIn()).toBeFalse();
    });

    it('logged in after good response', async () => {
        await service.init();
        expect(service.isLoggedIn()).toBeFalse();
        const http = TestBed.inject(HttpClient);
        const spy = spyOn(http, 'post').and.returnValue(of({
            err: '',
            warn: '',
            msg: {
                accessToken: 'test accessToken',
                refreshToken: 'test refreshToken'
            }
        }));
        await service.login('jaj', 'juj');
        expect(spy).toHaveBeenCalled();
        expect(service.isLoggedIn()).toBeTrue();
    });

    it('send signed request', async () => {
        localStorage.setItem('accessToken', 'tmp token used for testing purposes only');
        await service.init();
        const http = TestBed.inject(HttpTestingController);
        service.sendAuthorizedRequest('post', 'test', {}, {});
        const sentToken = http.expectOne('test').request.headers.get('Authorization');
        expect(sentToken).toBeTruthy();
    });


});
