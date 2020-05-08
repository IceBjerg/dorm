import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {ConfigService} from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('EventService', () => {
    const restapiUrl = 'non-existing-url';
    let service: EventService;
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(EventService);
        configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue(restapiUrl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('all functions should call the right api', () => {
        const http = TestBed.inject(HttpTestingController);
        const functionsToCall = [
            () => service.addEvent({location: '', date: '', description: '', name: '', num: '', partic_dorm: '', partic_out: '', tel: ''}),
            () => service.getAllEvents(),
            () => service.getOwnEvents(),
            () => service.updateEventApproval({status: true, id: NaN})
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
        expect(methods.length).toEqual(functionsToCall.length);
    });
});
