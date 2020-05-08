import {TestBed} from '@angular/core/testing';

import {ErrorReportService} from './error-report.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from './config.service';

describe('ErrorReportService', () => {
    const restapiUrl = 'non-existing-url';
    let service: ErrorReportService;
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(ErrorReportService);
        configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue(restapiUrl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('all functions should call the right api', () => {
        const http = TestBed.inject(HttpTestingController);
        const functionsToCall = [
            () => service.addError({issue: null, location: null, type: '', needTranslate: false}),
            () => service.getErrorHistoryUser(),
            () => service.getForeignText(),
            () => service.getMaintenanceWork(),
            () => service.maintenanceDone(NaN),
            () => service.translateError(NaN, null)
        ];
        functionsToCall.forEach(item => item());
        const sent = http.match((req): boolean => {
            return req.url.includes(restapiUrl + '/public/');
        });
        expect(sent.length).toEqual(functionsToCall.length);
        // check if all methods are in the test
        const proto = Object.getPrototypeOf(service);
        const props = Object.getOwnPropertyNames(proto);
        const methods = props.filter(item => item !== 'constructor'  && typeof service[item] === 'function');
        expect(methods.length).toEqual(functionsToCall.length);
    });


});
