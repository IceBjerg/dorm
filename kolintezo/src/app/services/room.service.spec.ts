import {TestBed} from '@angular/core/testing';

import {RoomService} from './room.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from './config.service';

describe('RoomService', () => {
    let service: RoomService;
    const restapiUrl = 'non-existing-url';
    let configService: ConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(RoomService);
        configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('restapiUrl').and.returnValue(restapiUrl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('all functions should call the right api', () => {
        const http = TestBed.inject(HttpTestingController);
        const functionsToCall = [
            () => service.addRoom({name: '', id: '', building: '', capacity: NaN, floor: NaN}),
            () => service.deleteRooms([]),
            () => service.getAllRooms(),
            () => service.getMyRoom(),
            () => service.getRoom(''),
            () => service.getUserWithRooms(),
            () => service.updateRoom({floor: NaN, capacity: NaN, building: '', id: '', name: ''})
        ];
        functionsToCall.forEach(item => item());
        const sent = http.match((req): boolean => {
            return req.url.includes(restapiUrl + '/public/') && req.url.toLowerCase().includes('room');
        });
        expect(sent.length).toEqual(functionsToCall.length);
        // check if all methods are in the test
        const proto = Object.getPrototypeOf(service);
        const props = Object.getOwnPropertyNames(proto);
        const methods = props.filter(item => item !== 'constructor' && typeof service[item] === 'function');
        expect(methods.length).toEqual(functionsToCall.length);
    });
});
