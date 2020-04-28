import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {RegisterService} from '../../services/register.service';
import {RotateService} from '../../services/rotate.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {ResponseHandlerService} from '../../services/response-handler.service';
import {definedFormControl, UserDataInput, UserDataInputTypes} from '../../interfaces/user-data-input';
import {KolNotificationType, NoticeService} from '../../services/notice.service';
import {UserFullNameComponent} from '../shared/components/user-full-name/user-full-name.component';
import {UserNeptunComponent} from '../shared/components/user-neptun/user-neptun.component';
import {UserEmailComponent} from '../shared/components/user-email/user-email.component';
import {UserGenderComponent} from '../shared/components/user-gender/user-gender.component';
import {UserNationalityComponent} from '../shared/components/user-nationality/user-nationality.component';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {


    constructor(public configService: ConfigService, public registerService: RegisterService, private rotateService: RotateService,
                private dialog: MatDialog, private responseHandler: ResponseHandlerService, private noticeService: NoticeService) {
    }

    @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
    public file: { data: File, inProgress: boolean, progress: number };


    public static resetFields(name: UserFullNameComponent, neptun: UserNeptunComponent, email: UserEmailComponent, gender: UserGenderComponent, nationality: UserNationalityComponent) {
        name.reset();
        neptun.reset();
        email.reset();
        gender.reset();
        nationality.reset();
    }

    ngOnInit(): void {

    }


    async uploadFile(file: { data: File, progress: number, inProgress: boolean }) {
        const errmsg = {
            title: 'ERRORS.ERROR',
            showNo: false,
            yesText: 'ACTIONS.OK',
            content: ''
        };

        if (file.data.name.endsWith('.xlsx')) {
            file.inProgress = true;
            this.rotateService.processStarted();
            try {
                const res = await this.registerService.registerBunch(file.data);
                this.noticeService.events.emit({
                    type: KolNotificationType.SNACK_BAR,
                    message: {
                        content: 'REGISTER.SUCC',
                        yesText: 'ACTIONS.HIDE',
                        title: 'success'
                    }
                });
            } catch (e) {
                file.inProgress = false;
                errmsg.content = 'ERRORS.UPLOAD';
                this.noticeService.events.emit({
                    type: KolNotificationType.DIALOG,
                    message: errmsg
                });
            } finally {
                this.rotateService.processEnded();
            }


        } else {
            this.file = null;
            errmsg.content = 'ERRORS.FILE_FORMAT';
            this.noticeService.events.emit({
                type: KolNotificationType.DIALOG,
                message: errmsg
            });
        }
    }

    onClick() {
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.value = null;
        fileUpload.onchange = () => {
            if (fileUpload.files.length) {
                this.file = {
                    data: fileUpload.files[0],
                    inProgress: false,
                    progress: 0
                };
                this.uploadFile(this.file);
            }
        };
        fileUpload.click();
    }

    async registerSingle(name: UserFullNameComponent, neptun: UserNeptunComponent, email: UserEmailComponent, gender: UserGenderComponent, nationality: UserNationalityComponent) {
        const body = {
            id: neptun.value,
            name: name.value,
            email: email.value,
            gender: gender.value,
            nationality: nationality.value
        };
        try {
            this.rotateService.processStarted();
            await this.registerService.registerOne(body);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'REGISTER.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            RegisterPageComponent.resetFields(name, neptun, email, gender, nationality);
        } catch (e) {
            const msg = e?.error?.err;
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: this.responseHandler.getMessage(msg),
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        } finally {
            this.rotateService.processEnded();
        }
    }
}
