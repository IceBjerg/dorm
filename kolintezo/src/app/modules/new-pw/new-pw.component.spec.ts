import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewPwComponent} from './new-pw.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ConfigService} from '../../services/config.service';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('NewPwComponent', () => {
    let component: NewPwComponent;
    let fixture: ComponentFixture<NewPwComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [NewPwComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), MatCardModule, SharedModule, NoopAnimationsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(NewPwComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
