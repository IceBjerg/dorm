import {Component, OnInit} from '@angular/core';
import {KolNotificationType, NoticeService} from '../../../../services/notice.service';
import {GuestsService} from '../../../../services/guests.service';
import {UserService} from '../../../../services/user.service';
import {GuestHostIdComponent} from '../../../shared/components/guest-host-id/guest-host-id.component';
import {GuestGuestNameComponent} from '../../../shared/components/guest-guest-name/guest-guest-name.component';
import {GuestGuestIdComponent} from '../../../shared/components/guest-guest-id/guest-guest-id.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-new-guest',
    templateUrl: './new-guest.component.html',
    styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit {

    isLoaded = false;
    ids = [];

    constructor(private noticeService: NoticeService, private guestsService: GuestsService, private userService: UserService,
                private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initData();
    }

    private async initData() {
        this.isLoaded = false;
        try {
            const tmp = await this.userService.getAllNeptuns() as any[];
            tmp.forEach( id => this.ids.push({ key: id, value: id}));
            this.isLoaded = true;
        } catch (e) {
        }
    }

    async addGuest(host: GuestHostIdComponent, gname: GuestGuestNameComponent, gid: GuestGuestIdComponent) {

        const res = {
            host: host.value,
            guest_name: gname.value,
            guest_id: gid.value
        };

        try {
            await this.guestsService.addGuest(res);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'GUESTS.ADD.SUCC',
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
                    content: 'GUESTS.ADD.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }
}
