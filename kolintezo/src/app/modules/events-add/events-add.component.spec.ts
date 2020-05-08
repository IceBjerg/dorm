import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsAddComponent} from './events-add.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ConfigService} from '../../services/config.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

describe('EventsAddComponent', () => {
    let component: EventsAddComponent;
    let fixture: ComponentFixture<EventsAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [EventsAddComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), SharedModule, NoopAnimationsModule, MatCardModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(EventsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
