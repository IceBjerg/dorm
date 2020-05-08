import {TestBed} from '@angular/core/testing';

import {RotateService} from './rotate.service';

describe('RotateService', () => {
    let service: RotateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RotateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('by default, it should not rotate', () => {
        expect(service.isRotating()).toBeFalse();
    });

    it('Basic functionality', () => {
        expect(service.isRotating()).toBeFalse();
        service.processStarted();
        expect(service.isRotating()).toBeTrue();
        service.processEnded();
        expect(service.isRotating()).toBeFalse();
    });

    it('Should only emit changes if it is needed', () => {
        // eg: if 2 process are running, only emit "rotate stopped", if the last one has ended.
        expect(service.isRotating()).toBeFalse();
        const testSpy = jasmine.createSpy('emit watcher');
        service.emitter.subscribe( (value) => testSpy(value));
        service.processStarted();
        service.processStarted();
        service.processEnded();
        service.processStarted();
        service.processEnded();
        service.processEnded();
        expect(testSpy).toHaveBeenCalledTimes(2);
        expect(testSpy).toHaveBeenCalledWith(true);
        expect(testSpy).toHaveBeenCalledWith(false);
    });
});
