import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {RotateService} from '../../services/rotate.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    public username;
    public password;
    public fail = false;

    constructor(private authService: AuthService, private rotateService: RotateService, private router: Router, private userService: UserService,
                private noticeService: NoticeService, private translateService: TranslateService) {
    }

    ngOnInit(): void {
    }

    async login() {
        this.fail = !await this.authService.login(this.username, this.password);
        if (!this.fail) {
            this.userService.init();
            this.router.navigateByUrl('main');
        } else {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    yesText: 'ACTIONS.HIDE',
                    content: 'LOGIN.FAIL',
                    title: 'error'
                }
            });
        }
    }
}
