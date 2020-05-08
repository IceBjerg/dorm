import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsApproveComponent} from './events-approve.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {ConfigService} from '../../services/config.service';

describe('EventsApproveComponent', () => {
    let component: EventsApproveComponent;
    let fixture: ComponentFixture<EventsApproveComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [EventsApproveComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), SharedModule, NoopAnimationsModule, MatCardModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(EventsApproveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
