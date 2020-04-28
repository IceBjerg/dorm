import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';
import {RotateService} from './rotate.service';

@Injectable({
    providedIn: 'root'
})
export class GuestsService {

    constructor(private authService: AuthService, private configService: ConfigService, private rotateService: RotateService) {
    }

    async addGuest(res: { guest_id: any; host: any; guest_name: any }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/addGuest';
            await this.authService.sendAuthorizedRequest('POST', url, res, {});
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getActiveGuests() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getActiveGuests';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async guestLeft(id: number) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/guestLeft';
            await this.authService.sendAuthorizedRequest('POST', url, {id}, {});
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getHistGuests() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getHistGuests';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }
}
