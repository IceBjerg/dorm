import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicTextareaComponent} from './basic-textarea.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ConfigService} from '../../../../services/config.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

describe('BasicTextareaComponent', () => {
    let component: BasicTextareaComponent;
    let fixture: ComponentFixture<BasicTextareaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [BasicTextareaComponent],
                imports: [HttpClientTestingModule, TranslateModule.forRoot(), MatFormFieldModule, ReactiveFormsModule, MatInputModule, NoopAnimationsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');

        fixture = TestBed.createComponent(BasicTextareaComponent);
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
        const input = fixture.debugElement.nativeElement.querySelector('textarea');
        expect(input.disabled).toBeTrue();
    });

    it('not disabled input', () => {
        component.disabled = false;
        fixture.detectChanges();
        const input = fixture.debugElement.nativeElement.querySelector('textarea');
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

    it('depending on the "rows" property, input should grow', () => {
        component.rows = 5;
        fixture.detectChanges();
        let input = fixture.debugElement.nativeElement.querySelector('textarea');
        const firstHeight = input.rows;
        component.rows = 25;
        fixture.detectChanges();
        input = fixture.debugElement.nativeElement.querySelector('textarea');
        const secondHeight = input.rows;
        expect(secondHeight).toBeGreaterThan(firstHeight);
    });
});
