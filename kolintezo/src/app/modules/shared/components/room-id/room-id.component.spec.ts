import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomIdComponent} from './room-id.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ConfigService} from '../../../../services/config.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

describe('RoomIdComponent', () => {
    let component: RoomIdComponent;
    let fixture: ComponentFixture<RoomIdComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [RoomIdComponent],
                imports: [HttpClientTestingModule, MatInputModule, NoopAnimationsModule, TranslateModule.forRoot(), MatAutocompleteModule, ReactiveFormsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(RoomIdComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('input is not required', () => {
        component.required = false;
        fixture.detectChanges();
        expect(component.ok).toBeTrue();
    });

    it('input is required', () => {
        component.required = true;
        fixture.detectChanges();
        expect(component.ok).toBeFalse();
        component.formControl.setValue('asde');
        fixture.detectChanges();
        expect(component.ok).toBeTrue();
    });

    it('input is too short', () => {
        component.model = 'asd';
        fixture.detectChanges();
        expect(component.formControl.errors).toBeTruthy();
    });

    it('input has special characters', () => {
        component.model = 'asd dsa';
        fixture.detectChanges();
        expect(component.formControl.errors).toBeTruthy();
    });

    it('input has no errors', () => {
        component.model = 'asddd';
        fixture.detectChanges();
        expect(component.formControl.errors).toBeFalsy();
    });

    it('on error, component calls the service', () => {
        const ser = TestBed.inject(ResponseHandlerService);
        const spy = spyOn(ser, 'getErrorMsg');
        component.model = 'asd';
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });
});
