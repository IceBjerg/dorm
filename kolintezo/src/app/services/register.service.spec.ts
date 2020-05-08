import {TestBed} from '@angular/core/testing';

import {RegisterService} from './register.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from './config.service';

describe('RegisterService', () => {
    let service: RegisterService;
    const restapiUrl = 'non-existing-url';
    let configService: ConfigService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(RegisterService);
        configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue(restapiUrl)
            .withArgs('frontendURL').and.returnValue('---not needed---');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('all functions should call the right api', () => {
        const http = TestBed.inject(HttpTestingController);
        const functionsToCall = [
            () => service.registerBunch(null),
            () => service.registerOne({id: '', name: '', email: ''}),
            () => service.newPassword('', '')
        ];
        functionsToCall.forEach(item => item());
        const sent = http.match((req): boolean => {
            return req.url.includes(restapiUrl + '/public/') && (req.url.toLowerCase().includes('register') || req.url.toLowerCase().includes('addpw'));
        });
        expect(sent.length).toEqual(functionsToCall.length);
        // check if all methods are in the test
        const proto = Object.getPrototypeOf(service);
        const props = Object.getOwnPropertyNames(proto);
        const methods = props.filter(item => item !== 'constructor' && typeof service[item] === 'function');
        expect(methods.length).toEqual(functionsToCall.length);
    });
});
