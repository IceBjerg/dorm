import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorReportComponent} from './error-report.component';
import {MatTableModule} from '@angular/material/table';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {ConfigService} from '../../services/config.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

describe('ErrorReportComponent', () => {
    let component: ErrorReportComponent;
    let fixture: ComponentFixture<ErrorReportComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ErrorReportComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), SharedModule, NoopAnimationsModule, MatCardModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(ErrorReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
