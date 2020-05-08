import {TestBed} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('ConfigService', () => {
    let service: ConfigService;
    const data = {
        testKey: 'testValue',
        testArray: ['element1', 'element2'],
        testObj: {
            key1: 12
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(ConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('init should call httpClient', async () => {
        const http = TestBed.inject(HttpClient);
        const spy = spyOn(http, 'get').and.returnValue(of(data));
        await service.init();
        expect(spy).toHaveBeenCalled();
    });

    it('init should just parse the data', async () => {
        const http = TestBed.inject(HttpClient);
        const spy = spyOn(http, 'get').and.returnValue(of(data));
        await service.init();
        expect(service.getData('testKey')).toEqual('testValue');
        expect(service.getData('testArray')).toEqual(['element1', 'element2']);
        expect(service.getData('testObj')).toEqual({
            key1: 12
        });
    });
});
