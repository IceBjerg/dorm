import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {KeyService} from '../../services/key.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';
import {KeysTableComponent} from '../shared/components/keys-table/keys-table.component';

@Component({
    selector: 'app-keys',
    templateUrl: './keys.component.html',
    styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
    isLoaded: boolean;
    keyData: any[];
    keyDataHist: any[];
    @ViewChild('whoToTake') template: TemplateRef<any>;
    @ViewChild('actual') actual: KeysTableComponent;
    @ViewChild('hist') hist: KeysTableComponent;

    constructor(private keyService: KeyService, private noticeService: NoticeService, private matDialog: MatDialog, private userService: UserService) {
    }

    ngOnInit(): void {
        this.updateData();
    }

    private async updateData() {
        try {
            this.keyData = await this.keyService.getKeyData();
            this.keyDataHist = await this.keyService.getKeyDataHist();
            if (this.isLoaded) {
                if (this.actual) {
                    this.actual.updateData(this.keyData);
                }
                if (this.hist) {
                    this.hist.updateData(this.keyDataHist);
                }
            } else {
                this.isLoaded = true;
            }
        } catch (e) {
            this.keyData = [];
            this.keyDataHist = [];
        }
    }

    async receiveUpdate(data: { id: number }) {
        try {
            await this.keyService.keyReceived(data);
            this.noticeService.events.emit(
                {
                    type: KolNotificationType.SNACK_BAR,
                    message: {
                        yesText: 'ACTIONS.HIDE',
                        content: 'KEYS.RECEIVED.SUCC',
                        title: 'success'
                    }
                }
            );

            this.updateData();
        } catch (e) {
            this.noticeService.events.emit(
                {
                    type: KolNotificationType.SNACK_BAR,
                    message: {
                        yesText: 'ACTIONS.HIDE',
                        content: 'KEYS.RECEIVED.ERR',
                        title: 'error'
                    }
                }
            );
        }
    }

    async takeKey(data: { keyId: number; keyName: string }) {
        const neptuns = [];
        (await this.userService.getAllNeptuns() as string[]).forEach( item => neptuns.push({key: item, value: item}));
        const ref = this.matDialog.open(this.template, {
            data: {
                neptuns,
                keyName: data.keyName
            }
        });
        ref.afterClosed().subscribe(async (res) => {
            if (res) {
                try {
                    await this.keyService.keyTaken({
                        key: data.keyId,
                        takenBy: res
                    });
                    this.noticeService.events.emit(
                        {
                            type: KolNotificationType.SNACK_BAR,
                            message: {
                                yesText: 'ACTIONS.HIDE',
                                content: 'KEYS.TAKEN.SUCC',
                                title: 'success'
                            }
                        }
                    );
                    this.updateData();
                } catch (e) {
                    this.noticeService.events.emit(
                        {
                            type: KolNotificationType.SNACK_BAR,
                            message: {
                                yesText: 'ACTIONS.HIDE',
                                content: 'KEYS.TAKEN.ERR',
                                title: 'error'
                            }
                        }
                    );
                }
            }
        });
    }
}
