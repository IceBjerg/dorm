import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportNeedTranslateComponent} from './report-need-translate.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ReportNeedTranslateComponent', () => {
    let component: ReportNeedTranslateComponent;
    let fixture: ComponentFixture<ReportNeedTranslateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ReportNeedTranslateComponent],
                imports: [HttpClientTestingModule, TranslateModule.forRoot(), MatSelectModule, ReactiveFormsModule, NoopAnimationsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(ReportNeedTranslateComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('not required', () => {
        component.required = false;
        fixture.detectChanges();
        expect(component.ok).toBeTrue();
    });

    it('required', () => {
        component.required = true;
        fixture.detectChanges();
        expect(component.ok).toBeFalse();
        component.fC.setValue('asd');
        expect(component.ok).toBeTrue();
    });

});
