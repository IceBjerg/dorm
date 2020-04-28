import {Component, OnInit} from '@angular/core';
import {Room} from '../../interfaces/room.model';
import {RoomService} from '../../services/room.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

@Component({
    selector: 'app-own-room',
    templateUrl: './own-room.component.html',
    styleUrls: ['./own-room.component.css']
})
export class OwnRoomComponent implements OnInit {

    public room: Room;

    constructor(private roomService: RoomService, private noticeService: NoticeService) {
    }

    async ngOnInit() {
        try {
            const res = await this.roomService.getMyRoom();
            this.room = res?.msg?.room as Room;
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'OWN-ROOM.ERROR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }
}

