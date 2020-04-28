import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GuestsService} from '../../services/guests.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

export class GuestRow {
    id: number;
    host: string;
    guest_name: string;
    guest_id: string;
    start: string;
    reporter: string;
}


export class GuestRowHist {
    id: number;
    host: string;
    guest_name: string;
    guest_id: string;
    start: string;
    reporter: string;
    end: string;
    ended_by: string;
}

@Component({
    selector: 'app-guests',
    templateUrl: './guests.component.html',
    styleUrls: ['./guests.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ],
})
export class GuestsComponent implements OnInit {
    displayedColumns = ['start', 'host', 'guest_name'];
    displayedColumnsHist = ['start', 'end', 'host', 'guest_name'];
    dataSource = new MatTableDataSource<GuestRow>();
    dataSourceHist = new MatTableDataSource<GuestRowHist>();
    expandedElement: null | GuestRow;
    expandedHistElement: null | GuestRowHist;

    constructor(private guestsService: GuestsService, private noticeService: NoticeService) {
    }

    ngOnInit(): void {
        this.initData();
    }

    private async initData() {
        try {
            this.dataSource.data = await this.guestsService.getActiveGuests();
            this.dataSourceHist.data = await this.guestsService.getHistGuests();
        } catch (e) {
            this.dataSource.data = [];
            this.dataSourceHist.data = [];
        }
    }

    async guestLeft(id: number) {
        try {
            await this.guestsService.guestLeft(id);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'GUESTS.LEAVE.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            this.expandedElement = null;
            setTimeout( () => this.initData(), 500);
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'GUESTS.LEAVE.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }

    getTrId(column: string) {
        switch (column) {
            case 'start':
                return 'GUESTS.START-TIME';
            case 'end':
                return 'GUESTS.END-TIME';
            case 'host':
                return 'GUESTS.HOST.NAME';
            case 'guest_name':
                return 'GUESTS.GUEST.NAME';
            default:
                return '!!!!!!! NOT SET!!!!!!!!!!!!!!!';
        }
    }
}
