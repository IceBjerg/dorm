import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicTextInputComponent} from './basic-text-input.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ConfigService} from '../../../../services/config.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

describe('BasicTextInputComponent', () => {
    let component: BasicTextInputComponent;
    let fixture: ComponentFixture<BasicTextInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [BasicTextInputComponent],
                imports: [HttpClientTestingModule, TranslateModule.forRoot(), MatAutocompleteModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NoopAnimationsModule],
                providers: []
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(BasicTextInputComponent);
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

    it('maxLength given', () => {
        component.maxLength = 2;
        fixture.detectChanges();
        component.formControl.setValue('test');
        expect(component.ok).toBeFalse();
        component.formControl.setValue('te');
        fixture.detectChanges();
        expect(component.ok).toBeTrue();
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


});
