import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomNewComponent} from './room-new.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('RoomNewComponent', () => {
    let component: RoomNewComponent;
    let fixture: ComponentFixture<RoomNewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [RoomNewComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), SharedModule, MatCardModule, NoopAnimationsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
