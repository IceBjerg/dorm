import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportLocComponent} from './report-loc.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

describe('ReportLocComponent', () => {
    let component: ReportLocComponent;
    let fixture: ComponentFixture<ReportLocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ReportLocComponent],
                imports: [HttpClientTestingModule, MatFormFieldModule, MatInputModule, TranslateModule.forRoot(), MatAutocompleteModule, NoopAnimationsModule, ReactiveFormsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(ReportLocComponent);
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
        const val = 'testValue';
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
        component.model = 'asd';
        fixture.detectChanges();
        component.reset();
        expect(component.value).toBe('');
        expect(component.formControl.untouched).toBeTrue();
    });

    it('disabled input', () => {
        component.disabled = true;
        fixture.detectChanges();
        const input = fixture.debugElement.nativeElement.querySelector('input');
        expect(input.disabled).toBeTrue();
    });

    it('not disabled input', () => {
        component.disabled = false;
        fixture.detectChanges();
        const input = fixture.debugElement.nativeElement.querySelector('input');
        expect(input.disabled).toBeFalse();
    });
});
