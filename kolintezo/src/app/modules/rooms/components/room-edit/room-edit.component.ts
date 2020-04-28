import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomRow} from '../../../../interfaces/room-row';
import {RoomService} from '../../../../services/room.service';
import {RoomNameComponent} from '../../../shared/components/room-name/room-name.component';
import {RoomBuildingComponent} from '../../../shared/components/room-building/room-building.component';
import {RoomFloorComponent} from '../../../shared/components/room-floor/room-floor.component';
import {RoomCapacityComponent} from '../../../shared/components/room-capacity/room-capacity.component';
import {KolNotificationType, NoticeService} from '../../../../services/notice.service';
import set = Reflect.set;

@Component({
    selector: 'app-room-edit',
    templateUrl: './room-edit.component.html',
    styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

    public roomId: string;
    public room: RoomRow;
    public isInitDone: boolean;
    constructor(private route: ActivatedRoute, private roomService: RoomService, private noticeService: NoticeService, private router: Router) {
    }

    async ngOnInit() {
        this.isInitDone = false;
        this.route.paramMap.subscribe(async (paramMap) => {
            this.roomId = paramMap.get('id');
            this.room = (await this.roomService.getRoom(this.roomId) as any).msg;
            this.isInitDone = true;
        });
    }

    async save(name: RoomNameComponent, building: RoomBuildingComponent, floor: RoomFloorComponent, capacity: RoomCapacityComponent) {
        const res = {
            id: this.roomId,
            name: name.value,
            building: building.value,
            floor: floor.value,
            capacity: capacity.value
        };
        try {
            await this.roomService.updateRoom(res);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'ROOMS.SAVE.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            setTimeout( () => {
                this.router.navigate(['..'], { relativeTo: this.route});
            }, 500);
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
