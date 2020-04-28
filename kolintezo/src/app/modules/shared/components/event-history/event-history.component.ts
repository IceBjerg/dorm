import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EventService} from '../../../../services/event.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PermissionService} from '../../../../services/permission.service';
import {UserService} from '../../../../services/user.service';

export class EventRow {
    id: number;
    event_organizer_name: string;
    event_organizer_neptun: string;
    event_organizer_email: string;
    event_organizer_tel: string;
    event_name: string;
    participant_num: number;
    event_time: string;
    event_description: string;
    event_location: string;
    participants_dorm: string;
    participants_out: string;
    approved_ov: string;
    approved_hok: string;
}

@Component({
    selector: 'app-event-history',
    templateUrl: './event-history.component.html',
    styleUrls: ['./event-history.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ],
})
export class EventHistoryComponent implements OnInit {

    @Output() stateChange = new EventEmitter< {status: boolean, id: number}>();
    @Input() isApprover = false;
    @Input() showAll = false;

    dataSourceHist = new MatTableDataSource<EventRow>();
    displayedColumnsHist: string[];
    expandedElement: any;


    constructor(private eventService: EventService, private userService: UserService) {
    }

    ngOnInit(): void {
        this.initData();

    }

    public async initData() {
        this.displayedColumnsHist = this.showAll ?  ['event_organizer_name', 'event_name', 'event_time', 'is_approved'] : ['event_name', 'event_time', 'is_approved'];
        try {
            this.dataSourceHist.data = this.showAll ? await this.eventService.getAllEvents() : await this.eventService.getOwnEvents();
        } catch (e) {
            this.dataSourceHist.data = [];
        }
    }

    getTrId(column: string) {
        switch (column) {
            case 'id':
                return 'ERROROROROROR';
            case 'is_approved':
                return 'EVENTS.EVENT.STATUS';
            case 'event_organizer_name':
                return 'EVENTS.EVENT.ORGANIZER.NAME';
            case 'event_organizer_neptun':
                return 'EVENTS.EVENT.ORGANIZER.NEPTUN';
            case 'event_organizer_email':
                return 'EVENTS.EVENT.ORGANIZER.EMAIL';
            case 'event_organizer_tel':
                return 'EVENTS.EVENT.ORGANIZER.TELEPHONE';
            case 'event_name':
                return 'EVENTS.EVENT.NAME';
            case 'participant_num':
                return 'EVENTS.EVENT.PARTICIPANT-NUM';
            case 'event_time':
                return 'EVENTS.EVENT.DATE';
            case 'event_description':
                return 'EVENTS.EVENT.DESCRIPTION';
            case 'event_location':
                return 'EVENTS.EVENT.LOCATION';
            case 'participants_dorm':
                return 'EVENTS.EVENT.PARTICIPANTS.DORM';
            case 'participants_out':
                return 'EVENTS.EVENT.PARTICIPANTS.OUT';
            case 'approved_ov':
                return 'EVENTS.EVENT.APPROVER.OV';
            case 'approved_hok':
                return 'EVENTS.EVENT.APPROVER.HOK';
            case 'approval':
                return 'EVENTS.EVENT.ACTION.APPROVAL';
            default:
                return 'ERROROROROROR';
        }
    }

    getKeys(element: any) {
        const res = Object.keys(element);
        const idx = res.findIndex( item => item === 'id');
        if (idx !== -1) {
            res.splice(idx, 1);
        }
        return res;

    }

    approveColumn(key: string) {
        return key === 'approved_ov' || key === 'approved_hok';
    }

    getIconByStatus(elementElement: string) {
        switch (elementElement) {
            case 'UNSET':
                return 'fas fa-question';
            case 'OK':
                return 'fas fa-check';
            case 'NO':
                return 'fas fa-times';
        }
    }

    approve(id: number) {
        this.stateChange.emit( {
            status: true,
            id: id
        });
    }

    decline(id: number) {
        this.stateChange.emit( {
            status: false,
            id: id
        });
    }

    myReaction(element: EventRow) {
        const perms = this.userService.getUser()?.permissions;
        if (perms && perms.includes(9)) {
            // ov
            return element.approved_ov;
        } else if (perms && perms.includes(10)) {
            // hok
            return element.approved_hok;
        }
        throw new Error('Should not visit this page');
    }
}
