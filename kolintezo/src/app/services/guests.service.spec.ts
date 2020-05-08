import {TestBed} from '@angular/core/testing';

import {GuestsService} from './guests.service';
import {ConfigService} from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('GuestsService', () => {
    let service: GuestsService;
    const restapiUrl = 'non-existing-url';
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(GuestsService);
        configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue(restapiUrl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('all functions should call the right api', () => {
        const http = TestBed.inject(HttpTestingController);
        const functionsToCall = [
            () => service.addGuest({guest_id: '', guest_name: '', host: ''}),
            () => service.getActiveGuests(),
            () => service.getHistGuests(),
            () => service.guestLeft(NaN)
        ];
        functionsToCall.forEach(item => item());
        const sent = http.match((req): boolean => {
            return req.url.includes(restapiUrl + '/public/') && req.url.toLowerCase().includes('guest');
        });
        expect(sent.length).toEqual(functionsToCall.length);
        // check if all methods are in the test
        const proto = Object.getPrototypeOf(service);
        const props = Object.getOwnPropertyNames(proto);
        const methods = props.filter(item => item !== 'constructor' && typeof service[item] === 'function');
        expect(methods.length).toEqual(functionsToCall.length);
    });
});
