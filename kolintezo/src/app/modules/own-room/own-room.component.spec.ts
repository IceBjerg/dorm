import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnRoomComponent} from './own-room.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('OwnRoomComponent', () => {
    let component: OwnRoomComponent;
    let fixture: ComponentFixture<OwnRoomComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [OwnRoomComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot()]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OwnRoomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
