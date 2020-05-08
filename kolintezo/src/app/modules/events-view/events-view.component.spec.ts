import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsViewComponent} from './events-view.component';
import {ConfigService} from '../../services/config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

describe('EventsViewComponent', () => {
    let component: EventsViewComponent;
    let fixture: ComponentFixture<EventsViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [EventsViewComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), SharedModule, NoopAnimationsModule, MatCardModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(EventsViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
