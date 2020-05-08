import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportTypeComponent} from './report-type.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

describe('ReportTypeComponent', () => {
    let component: ReportTypeComponent;
    let fixture: ComponentFixture<ReportTypeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ReportTypeComponent],
                imports: [HttpClientTestingModule, MatSelectModule, ReactiveFormsModule, TranslateModule.forRoot(), NoopAnimationsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(ReportTypeComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('it initializes the good key/value pairs', () => {
        const res = { unknown: 'problem'};
        const responseHandler = TestBed.inject(ResponseHandlerService);
        spyOn(responseHandler, 'getErrorReportTypes').and.returnValue( res as any);
        fixture.detectChanges();
        expect(component.values).toEqual(res);
    });

    it('first key is the default value', () => {
        const res = { unknown: 'problem'};
        const responseHandler = TestBed.inject(ResponseHandlerService);
        spyOn(responseHandler, 'getErrorReportTypes').and.returnValue( res as any);
        fixture.detectChanges();
        expect(component.value).toEqual('unknown');
    });
});
