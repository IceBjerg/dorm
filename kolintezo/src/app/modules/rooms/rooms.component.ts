import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomRow} from '../../interfaces/room-row';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {RoomService} from '../../services/room.service';
import {SelectionModel} from '@angular/cdk/collections';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

    displayedColumns: string[] = ['check-box', 'id', 'name', 'building', 'floor', 'capacity', 'edit-button'];
    dataSource = new MatTableDataSource<RoomRow>();

    selection = new SelectionModel<RoomRow>(true, []);

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private roomService: RoomService, private noticeService: NoticeService) {
    }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        setTimeout( async () => {

            this.updateData();
        }, 500);
    }

    async updateData() {
        this.dataSource.data = await this.roomService.getAllRooms() as any;
    }

    getTranslateId(key: string) {
        switch (key) {
            case 'id':
                return 'ROOM.ID';
            case 'name':
                return 'ROOM.NAME';
            case 'building':
                return 'ROOM.BUILDING';
            case 'floor':
                return 'ROOM.FLOOR';
            case 'capacity':
                return 'ROOM.CAPACITY';
        }
        return '? ????????? NOT SET ?????? ';
    }

    public masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.filteredData.forEach(row => this.selection.select(row));
    }

    public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.filteredData.length;
        return numSelected === numRows;
    }

    async deleteSelected() {
        const ids = [];
        for (const room of this.selection.selected) {
            ids.push(room.id);
        }

        try {
            await this.roomService.deleteRooms(ids);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'ROOMS.DELETE.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            this.selection.clear();
            this.updateData();
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'ROOMS.DELETE.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }
}
