import {TestBed} from '@angular/core/testing';

import {ResponseHandlerService} from './response-handler.service';
import {FormControl} from '@angular/forms';

describe('ResponseHandlerService', () => {
    let service: ResponseHandlerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ResponseHandlerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('if no error, should return error', () => {
        const testForm = new FormControl();
        expect(service.getErrorMsg(testForm)).toEqual('ERRORS.UNKNOWN');
    });


});
