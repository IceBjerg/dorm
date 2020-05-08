import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from './config.service';
import createSpy = jasmine.createSpy;
import {AuthService} from './auth.service';

describe('UserService', () => {
    let service: UserService;
    const restapiUrl = 'non-existing-url';
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(UserService);
        configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue(restapiUrl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('all functions should call the right api', () => {
        const http = TestBed.inject(HttpTestingController);
        const functionsToCall = [
            () => service.init(),
            () => service.getAllNeptuns(),
            () => service.getAllUsers(),
            () => service.updateUsers([]),
            () => service.saveRoomAssingnment({deleted: [], updated: []}),
            () => service.deleteUsers([])
        ];
        functionsToCall.forEach(item => item());
        const sent = http.match((req): boolean => {
            return req.url.includes(restapiUrl + '/public/');
        });
        expect(sent.length).toEqual(functionsToCall.length);
        // check if all methods are in the test
        const proto = Object.getPrototypeOf(service);
        const props = Object.getOwnPropertyNames(proto);
        const methods = props.filter(item => item !== 'constructor' && typeof service[item] === 'function');
        expect(methods.length - 1).toEqual(functionsToCall.length);
    });

    it('init function should emit the event that the user has changed', async () => {
        // this is when the menu knows to update itself
        const auth = TestBed.inject(AuthService);
        spyOn(auth, 'sendAuthorizedRequest').and.returnValue(Promise.resolve({ err: '', warn: '', msg: ''}));
        const testSpy = jasmine.createSpy('emitter watcher');
        service.emitter.subscribe( () => testSpy());
        await service.init();

        expect(testSpy).toHaveBeenCalled();
    });
});
