import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from '../../services/register.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

@Component({
    selector: 'app-new-pw',
    templateUrl: './new-pw.component.html',
    styleUrls: ['./new-pw.component.css']
})
export class NewPwComponent implements OnInit {
    private token;

    constructor(private route: ActivatedRoute, private registerService: RegisterService, private router: Router, private noticeService: NoticeService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(paramMap => {
            this.token = paramMap.get('id');
        });
    }

    async addPassword(pw: string) {
        try {
            await this.registerService.newPassword(this.token, pw);
            this.router.navigateByUrl('login');
        } catch (e) {
            this.noticeService.events.emit(
                {
                    type: KolNotificationType.SNACK_BAR,
                    message: {
                        yesText: 'ACTIONS.HIDE',
                        title: '',
                        content: 'NEW-PW.ERROR'
                    }
                }
            );
        }
    }
}
