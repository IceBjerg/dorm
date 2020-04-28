import {EventEmitter, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';
import {RotateService} from './rotate.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user;
    public emitter = new EventEmitter();

    constructor(private authService: AuthService, private configService: ConfigService, private rotateService: RotateService) {
    }

    async init() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/userData';
            this.user = (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any)?.msg;
            this.emitter.emit();
            this.rotateService.processEnded();
        } catch (e) {
            this.rotateService.processEnded();
            throw e;
        }
    }

    getUser() {
        return this.user;
    }

    async getAllUsers() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getAllUsers';
            const ret = (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any)?.msg;
            this.rotateService.processEnded();
            return ret;
        } catch (e) {
            this.rotateService.processEnded();
            throw e;
        }
    }

    async updateUsers(users: { [key: string]: string}[]) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/updateUsers';
            await this.authService.sendAuthorizedRequest('POST', url, {users}, {});
            this.rotateService.processEnded();
        } catch (e) {
            this.rotateService.processEnded();
            throw e;
        }
    }

    async deleteUsers(userIds: string[]) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/deleteUsers';
            await this.authService.sendAuthorizedRequest('PUT', url, {users: userIds}, {});
            this.rotateService.processEnded();
        } catch (e) {
            this.rotateService.processEnded();
            throw e;
        }
    }

    async saveRoomAssingnment(mod: { deleted: { room_id: string; user_id: string }[]; updated: { room_id: string; user_id: string }[] }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/updateUserRooms';
            await this.authService.sendAuthorizedRequest('POST', url, mod, {});
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getAllNeptuns() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getAllNeptuns';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }
}
