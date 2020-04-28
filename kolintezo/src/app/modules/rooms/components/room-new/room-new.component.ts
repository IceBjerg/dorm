import {Component, OnInit} from '@angular/core';
import {RoomIdComponent} from '../../../shared/components/room-id/room-id.component';
import {RoomCapacityComponent} from '../../../shared/components/room-capacity/room-capacity.component';
import {RoomFloorComponent} from '../../../shared/components/room-floor/room-floor.component';
import {RoomBuildingComponent} from '../../../shared/components/room-building/room-building.component';
import {RoomNameComponent} from '../../../shared/components/room-name/room-name.component';
import {KolNotificationType, NoticeService} from '../../../../services/notice.service';
import {RoomService} from '../../../../services/room.service';

@Component({
    selector: 'app-room-new',
    templateUrl: './room-new.component.html',
    styleUrls: ['./room-new.component.css']
})
export class RoomNewComponent implements OnInit {

    constructor(private roomService: RoomService, private noticeService: NoticeService) {
    }

    private static resetFields(id: RoomIdComponent, name: RoomNameComponent, building: RoomBuildingComponent, floor: RoomFloorComponent, capacity: RoomCapacityComponent) {
        id.reset();
        name.reset();
        building.reset();
        floor.reset();
        capacity.reset();
    }

    ngOnInit(): void {
    }

    async add(id: RoomIdComponent, name: RoomNameComponent, building: RoomBuildingComponent, floor: RoomFloorComponent, capacity: RoomCapacityComponent) {
        const res = {
            id: id.value,
            name: name.value,
            building: building.value,
            floor: floor.value,
            capacity: capacity.value
        };

        try {
            await this.roomService.addRoom(res);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'ROOMS.SAVE.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            RoomNewComponent.resetFields(id, name, building, floor, capacity);
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'ROOMS.SAVE.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }
}
