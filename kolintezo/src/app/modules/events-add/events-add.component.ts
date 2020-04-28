import {Component, OnInit, ViewChild} from '@angular/core';
import {BasicTextInputComponent} from '../shared/components/basic-text-input/basic-text-input.component';
import {BasicTextareaComponent} from '../shared/components/basic-textarea/basic-textarea.component';
import {EventService} from '../../services/event.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';
import {EventHistoryComponent} from '../shared/components/event-history/event-history.component';

@Component({
    selector: 'app-events-add',
    templateUrl: './events-add.component.html',
    styleUrls: ['./events-add.component.css']
})
export class EventsAddComponent implements OnInit {

    @ViewChild('name') name: BasicTextInputComponent;
    @ViewChild('num') num: BasicTextInputComponent;
    @ViewChild('date') date: BasicTextInputComponent;
    @ViewChild('location') location: BasicTextInputComponent;
    @ViewChild('tel') tel: BasicTextInputComponent;
    @ViewChild('desc') desc: BasicTextareaComponent;
    @ViewChild('particDorm') particDorm: BasicTextareaComponent;
    @ViewChild('particOut') particOut: BasicTextareaComponent;

    @ViewChild('eventHist') eventHist: EventHistoryComponent;

    constructor(private eventService: EventService, private noticeService: NoticeService) {
    }

    ngOnInit(): void {
    }

    async addEvent() {
        const res = {
            name: this.name.value,
            num: this.num.value,
            date: this.date.value,
            location: this.location.value,
            tel: this.tel.value,
            description: this.desc.value,
            partic_dorm: this.particDorm.value,
            partic_out: this.particOut.value
        };
        try {
            await this.eventService.addEvent(res);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'EVENTS.ADD.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            this.reset();
            this.eventHist.initData();
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'EVENTS.ADD.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }

    }

    private reset() {
        for (const field of [this.name, this.num, this.date, this.location, this.tel, this.desc, this.particDorm, this.particOut]) {
            field.reset();
        }
    }
}
