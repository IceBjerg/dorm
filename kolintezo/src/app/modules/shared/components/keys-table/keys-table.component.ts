import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

export class KeyRow {
    id: number;
    key_id: number;
    user: string;
    start_time: string;
    accepted_by: string;
    end_time: string;
    ended_by: string;
}

@Component({
    selector: 'app-keys-table',
    templateUrl: './keys-table.component.html',
    styleUrls: ['./keys-table.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ],
})
export class KeysTableComponent implements OnInit {
    dataSource = new MatTableDataSource<KeyRow>();
    displayedColumns: string[];
    expandedElement: any;
    @Input() isEditMode = false;
    @Input() data: any[] = [];
    @Output() receiveUpdates = new EventEmitter<{ id: number }>();
    @Output() keyTaking = new EventEmitter<{ keyId: number, keyName: string }>();

    constructor() {
    }

    ngOnInit(): void {
        if (this.isEditMode) {
            this.displayedColumns = ['key_id', 'user', 'action'];
        } else {
            this.displayedColumns = ['key_id', 'user', 'period', 'end_time'];
        }
        this.dataSource.data = this.data;
    }

    public updateData(data2: any[]) {
        this.dataSource.data = data2;
    }

    getTrId(column: string) {
        switch (column) {
            case 'id':
                return 'KEYS.COLUMN.ID';
            case 'key_id':
                return 'KEYS.COLUMN.KEY-ID';
            case 'user':
                return 'KEYS.COLUMN.USER';
            case 'start_time':
                return 'KEYS.COLUMN.START';
            case 'accepted_by':
                return 'KEYS.COLUMN.ACC-BY';
            case 'end_time':
                return 'KEYS.COLUMN.END';
            case 'ended_by':
                return 'KEYS.COLUMN.END-BY';
            default:
                return 'ERRRRRRRRRRRR';
        }
    }


    getKeys(element: any) {
        const tmp = Object.keys(element);
        const idx = tmp.findIndex((index) => index === 'id');
        if (idx !== -1) {
            tmp.splice(idx, 1);
        }
        return tmp;
    }

    getKeyName(id: number) {
        return 'KEYS.KEY' + id;
    }

    keyReceived(id: number) {
        this.receiveUpdates.emit({
            id
        });
    }


    takeKey(keyId: number) {
        this.keyTaking.emit({
            keyId,
            keyName: this.getKeyName(keyId)
        });
    }

    getTimeNiceFormat(start: string, end: string) {
        const startSec = new Date(start).getTime();
        const endSec = new Date(end).getTime();
        let sec = (endSec - startSec) / 1000;
        const res: number[] = [];
        const dividers = [60, 60];
        dividers.forEach(divider => {
            res.unshift(sec % divider);
            sec = (sec - res[0]) / divider;
        });
        res.unshift(sec);

        return res[0].toString(10).padStart(2, '0') + ':' + res[1].toString(10).padStart(2, '0');

    }
}
