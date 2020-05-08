import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventHistoryComponent} from './event-history.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatCell, MatTableModule} from '@angular/material/table';
import {TranslateModule} from '@ngx-translate/core';
import {EventService} from '../../../../services/event.service';
import {By} from '@angular/platform-browser';
import {UserService} from '../../../../services/user.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('EventHistoryComponent', () => {
    let component: EventHistoryComponent;
    let fixture: ComponentFixture<EventHistoryComponent>;
    let eventService: EventService;

    const retValue = [
        {
            id: NaN,
            event_organizer_name: '',
            event_organizer_neptun: '',
            event_organizer_email: '',
            event_organizer_tel: '',
            event_name: '',
            participant_num: NaN,
            event_time: '',
            event_description: '',
            event_location: '',
            participants_dorm: '',
            participants_out: '',
            approved_ov: '',
            approved_hok: '',
        },
        {
            id: NaN,
            event_organizer_name: '',
            event_organizer_neptun: '',
            event_organizer_email: '',
            event_organizer_tel: '',
            event_name: '',
            participant_num: NaN,
            event_time: '',
            event_description: '',
            event_location: '',
            participants_dorm: '',
            participants_out: '',
            approved_ov: '',
            approved_hok: '',
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [EventHistoryComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, MatTableModule, TranslateModule.forRoot(), NoopAnimationsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventHistoryComponent);
        component = fixture.componentInstance;
        eventService = TestBed.inject(EventService);
        spyOn(eventService, 'getAllEvents').and.returnValue(Promise.resolve(retValue));
        spyOn(eventService, 'getOwnEvents').and.returnValue(Promise.resolve(retValue));
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('viewer does not see admin columns', () => {
        fixture.detectChanges();
        expect(component.displayedColumnsHist.length).toEqual(3);
    });

    it('event admin sees the approve columns', () => {
        component.showAll = true;
        fixture.detectChanges();
        expect(component.displayedColumnsHist.length).toEqual(4);
    });

    it('event admin sees the approve columns', () => {
        component.showAll = true;
        fixture.detectChanges();
        expect(component.displayedColumnsHist.length).toEqual(4);
    });

    it('has the right number of rows as admin', async () => {
        component.showAll = true;
        fixture.detectChanges();
        await component.initData();
        const cells = fixture.nativeElement.querySelectorAll('td');
        expect(cells.length).toEqual(retValue.length * (component.displayedColumnsHist.length + 1));
    });


    it('has the right number of rows as non admin', async () => {
        component.showAll = false;
        await component.initData();
        fixture.detectChanges();
        const cells = fixture.nativeElement.querySelectorAll('td');
        expect(cells.length).toEqual(retValue.length * (component.displayedColumnsHist.length + 1));
    });

    it('approver sees the approve buttons', async () => {
        const userService = TestBed.inject(UserService);
        spyOn(userService, 'getUser').and.returnValue({ permissions: [10]});
        component.showAll = true;
        component.isApprover = true;
        await component.initData();
        fixture.detectChanges();
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toEqual(retValue.length * 2);
    });


});
