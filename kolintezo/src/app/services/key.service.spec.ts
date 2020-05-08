import {TestBed} from '@angular/core/testing';

import {KeyService} from './key.service';
import {ConfigService} from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('KeyService', () => {
    let service: KeyService;
    const restapiUrl = 'non-existing-url';
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(KeyService);
        configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue(restapiUrl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('all functions should call the right api', () => {
        const http = TestBed.inject(HttpTestingController);
        const functionsToCall = [
            () => service.getKeyData(),
            () => service.getKeyDataHist(),
            () => service.keyTaken({key: NaN, takenBy: null}),
            () => service.keyReceived({id: NaN})
        ];
        functionsToCall.forEach(item => item());
        const sent = http.match((req): boolean => {
            return req.url.includes(restapiUrl + '/public/') && req.url.toLowerCase().includes('key');
        });
        expect(sent.length).toEqual(functionsToCall.length);
        // check if all methods are in the test
        const proto = Object.getPrototypeOf(service);
        const props = Object.getOwnPropertyNames(proto);
        const methods = props.filter(item => item !== 'constructor' && typeof service[item] === 'function');
        expect(methods.length).toEqual(functionsToCall.length);
    });
});
