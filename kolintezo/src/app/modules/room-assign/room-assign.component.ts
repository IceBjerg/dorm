import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {RoomService} from '../../services/room.service';
import {User} from '../../interfaces/user';
import {Room} from '../../interfaces/room.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

@Component({
    selector: 'app-room-assign',
    templateUrl: './room-assign.component.html',
    styleUrls: ['./room-assign.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ],
})
export class RoomAssignComponent implements OnInit {
    hasData: boolean;
    users: User[];
    rooms: Room[];
    userRooms: { 'user_id': string, 'room_id': string }[];
    public initialUserRooms: { 'user_id': string, 'room_id': string }[];

    dataSource = new MatTableDataSource<Room>();
    displayedColumns = ['check-box', 'name', 'edit-user'];
    selection = new SelectionModel<Room>(true, []);
    @ViewChild(MatSort, {static: true}) sort: MatSort;


    @ViewChild('popup') popup: TemplateRef<any>;
    popupRoom: Room;
    expandedElement: Room;

    userFormControl: FormControl;

    constructor(private userService: UserService, private roomService: RoomService, private dialog: MatDialog, private noticeService: NoticeService) {
    }

    ngOnInit(): void {
        this.hasData = false;
        this.initData();
    }

    async initData() {
        this.users = await this.userService.getAllUsers();
        this.rooms = await this.roomService.getAllRooms();
        this.initialUserRooms = await this.roomService.getUserWithRooms();
        this.userRooms = JSON.parse(JSON.stringify(this.initialUserRooms));
        this.dataSource.sort = this.sort;
        this.dataSource.data = this.rooms;
        this.hasData = true;
    }


    getNumberOfResidents(id: string) {
        return this.userRooms.filter(row => row.room_id === id).length;
    }

    isFullRoom(room: Room) {
        return room.capacity <= this.getNumberOfResidents(room.id);
    }

    getTranslateId(column: string) {
        switch (column) {
            case 'name':
                return 'ROOM.NAME';
            case 'id':
                return 'ROOM.ID';
            case 'edit-user':
                return 'ROOM.EDIT-USERS';
            default:
                return '';
        }
    }

    public masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    getResidentsOfRoom(roomId: string): User[] {
        let res: User[];
        const userIds = this.userRooms.filter(row => row.room_id === roomId);
        res = this.users.filter(user => userIds.some(userWithRooms => userWithRooms.user_id === user.id));
        return res;
    }

    test(room: Room) {
        this.popupRoom = room;
        const ref = this.dialog.open(
            this.popup,
        );
        this.setFormControl();
        ref.afterClosed().subscribe(() => {
            this.popupRoom = null;
        });
    }

    setFormControl() {
        const residents = this.getResidentsOfRoom(this.popupRoom.id);
        const resIds = [];
        residents.forEach(user => resIds.push(user.id));
        this.userFormControl = new FormControl(resIds);
    }


    selectionChange($event: MatSelectChange) {
        const roomId = this.popupRoom.id;
        const users = $event.value as string[];
        const usersOld = [];
        this.userRooms.filter(userRoom => userRoom.room_id === roomId).forEach(data => usersOld.push(data.user_id));

        if (usersOld.length < users.length) {
            // users were added
            users.forEach(user => {
                if (!usersOld.includes(user)) {
                    this.userRooms.push({
                        user_id: user,
                        room_id: this.popupRoom.id
                    });
                }
            });
        } else if (users.length < usersOld.length) {
            // deletion
            usersOld.forEach(oldUser => {
                if (!users.includes(oldUser)) {
                    const toDel = this.userRooms.find(el => el.room_id === this.popupRoom.id && el.user_id === oldUser);
                    const idx = this.userRooms.indexOf(toDel);
                    this.userRooms.splice(idx, 1);
                }
            });
        }
    }

    isDisabled(roomId: string, userId: string): boolean {
        // in other room:
        if (this.userRooms.some(el => el.user_id === userId && el.room_id !== roomId)) {
            return true;
        }
        if (this.isFullRoom(this.rooms.find(room => room.id === roomId))) {
            return !this.userRooms.some(userRoom => roomId === userRoom.room_id && userId === userRoom.user_id);
        } else {
            return false;
        }
    }

    arrayEquals(array1: { user_id: string, room_id: string }[], array2: { user_id: string, room_id: string }[]) {
        if (array1 === array2) {
            return true;
        }
        if (array1 == null || array2 == null) {
            return false;
        }
        if (array1.length !== array2.length) {
            return false;
        }
        const compareFn = (a: { user_id: string, room_id: string }, b: { user_id: string, room_id: string }) => {
            return a.user_id.localeCompare(b.user_id);
        };
        array1.sort(compareFn);
        array2.sort(compareFn);

        for (let i = 0; i < array1.length; ++i) {
            if (array1[i].user_id !== array2[i].user_id || array1[i].room_id !== array2[i].room_id) {
                return false;
            }
        }
        return true;
    }

    cancel() {

        this.userRooms = JSON.parse(JSON.stringify(this.initialUserRooms));
    }

    removeFromRoom(userId: string, roomId: string) {
        const toDel = this.userRooms.find(el => el.room_id === roomId && el.user_id === userId);
        const idx = this.userRooms.indexOf(toDel);
        this.userRooms.splice(idx, 1);

        //
        // this.userRooms.forEach( userRoom => {
        //     if (userRoom.user_id === userId && )
        // })
    }

    getFreeUsers(): User[] {
        const ret: User[] = [];

        this.users.forEach(user => {
            if (!this.userRooms.some(userRoom => userRoom.user_id === user.id)) {
                ret.push(user);
            }
        });

        return ret;

    }

    addToRoom(userId: string, roomId: string) {
        this.userRooms.push({
            user_id: userId,
            room_id: roomId
        });
    }

    async save() {
        const mod: {
            deleted: { room_id: string, user_id: string }[],
            updated: { room_id: string, user_id: string }[],
        } = {
            deleted: [],
            updated: []
        };

        // added
        this.userRooms.forEach(userRoom => {
            if (!this.initialUserRooms.some(userRoomOld => userRoomOld.room_id === userRoom.room_id && userRoomOld.user_id === userRoom.user_id)) {
                mod.updated.push(userRoom);
            }
        });

        // deleted
        this.initialUserRooms.forEach( userRoomOld => {
            if (!this.userRooms.some( userRoom => userRoomOld.room_id === userRoom.room_id && userRoomOld.user_id === userRoom.user_id)){
                mod.deleted.push(userRoomOld);
            }
        });

        // changed
        mod.deleted.forEach( userRoom => {
            if (mod.updated.some( ur => ur.user_id === userRoom.user_id)) {
                // the person's place has changed
                mod.deleted.splice(mod.deleted.findIndex( urr => urr === userRoom), 1);
            }
        });
        try {
            await this.userService.saveRoomAssingnment(mod);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    yesText: 'ACTIONS.HIDE',
                    content: 'ROOM-ASSIGN.SAVE.SUCC',
                    title: 'success'
                }
            });
            this.initData();
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    yesText: 'ACTIONS.HIDE',
                    content: 'ROOM-ASSIGN.SAVE.ERR',
                    title: 'error'
                }
            });
        }
    }

    kickoutFromSelected() {
        this.selection.selected.forEach( (room) => {
            const userRooms = this.userRooms.filter( userRoom => room.id === userRoom.room_id);
            userRooms.forEach( userRoom => {
                const idx = this.userRooms.findIndex( ur => userRoom.room_id === ur.room_id && userRoom.user_id === ur.user_id);
                this.userRooms.splice(idx, 1);
            });
        });
    }
}
