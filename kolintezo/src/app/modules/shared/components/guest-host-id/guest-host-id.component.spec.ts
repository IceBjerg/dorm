import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GuestHostIdComponent} from './guest-host-id.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {MatSelectModule} from '@angular/material/select';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

describe('GuestHostIdComponent', () => {
    let component: GuestHostIdComponent;
    let fixture: ComponentFixture<GuestHostIdComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [GuestHostIdComponent],
                imports: [HttpClientTestingModule, MatFormFieldModule, MatInputModule, TranslateModule.forRoot(), MatAutocompleteModule, NoopAnimationsModule, ReactiveFormsModule, MatSelectModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(GuestHostIdComponent);
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
        component.formControl.setValue('macska');
        fixture.detectChanges();
        expect(component.ok).toBeTrue();
    });

    it('initialization with value', () => {
        component.values = [
            {
                key: 'testKey',
                value: 'testval1'
            },
            {
                key: 'testKey2',
                value: 'testval2'
            }
        ];

        const val = 'testKey';
        component.model = val;
        fixture.detectChanges();
        expect(component.value).toEqual(val);
    });

    it('on error, service should be called for translateId', () => {
        const errorHandler = TestBed.inject(ResponseHandlerService);
        const spy = spyOn(errorHandler, 'getErrorMsg');
        component.required = true;
        fixture.detectChanges();
        component.formControl.setValue('a');
        component.formControl.setValue('');
        expect(spy).toHaveBeenCalled();
    });

    it('reset the input', () => {
        component.values = [
            {
                key: 'testKey',
                value: 'testval1'
            },
            {
                key: 'testKey2',
                value: 'testval2'
            }
        ];
        component.model = 'testKey';
        fixture.detectChanges();
        component.reset();
        expect(component.value).toBe(null);
        expect(component.formControl.untouched).toBeTrue();
    });

    it('should create', () => {
        component.values = [
            {
                key: 'asd',
                value: 'dsa'
            },
            {
                key: 'dsa',
                value: 'aaaaa'
            }
        ];

        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
