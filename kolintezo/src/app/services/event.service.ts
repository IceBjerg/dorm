import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';
import {RotateService} from './rotate.service';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(private authService: AuthService, private configService: ConfigService, private rotateService: RotateService) {
    }


    async addEvent(res: { date: any; partic_dorm: any; num: any; name: any; description: any; partic_out: any; location: any; tel: any }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/addEvent';
            await this.authService.sendAuthorizedRequest('POST', url, res, {});
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getOwnEvents() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getOwnEvents';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getAllEvents() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getAllEvents';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async updateEventApproval(body: { status: boolean; id: number }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/updateEventApproval';
            await this.authService.sendAuthorizedRequest('POST', url, body, {});
        } finally {
            this.rotateService.processEnded();
        }
    }
}
