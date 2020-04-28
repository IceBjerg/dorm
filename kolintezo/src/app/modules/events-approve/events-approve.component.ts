import {Component, OnInit, ViewChild} from '@angular/core';
import {EventHistoryComponent} from '../shared/components/event-history/event-history.component';
import {EventService} from '../../services/event.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

@Component({
    selector: 'app-events-approve',
    templateUrl: './events-approve.component.html',
    styleUrls: ['./events-approve.component.css']
})
export class EventsApproveComponent implements OnInit {

    @ViewChild('event') event: EventHistoryComponent;

    constructor(private eventService: EventService, private noticeService: NoticeService) {
    }

    ngOnInit(): void {
    }

    async stateChange($event: { status: boolean; id: number }) {
        try {
            await this.eventService.updateEventApproval($event);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'EVENTS.UPDATE.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            if (this.event) {
                this.event.initData();
            }
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'EVENTS.UPDATE.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }
}
