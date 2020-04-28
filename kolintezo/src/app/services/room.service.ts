import {Injectable} from '@angular/core';
import {RotateService} from './rotate.service';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private rotateService: RotateService, private authService: AuthService, private configService: ConfigService) {
    }

    async getMyRoom() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/myRoom';
            const ret = await this.authService.sendAuthorizedRequest('GET', url, {}, {});
            this.rotateService.processEnded();
            return ret;
        } catch (e) {
            this.rotateService.processEnded();
            throw e;
        }
    }

    async getAllRooms() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getAllRooms';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }

    }

    async getRoom(roomId: string) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getRoom';
            const ret = await this.authService.sendAuthorizedRequest('POST', url, {room: roomId}, {});
            this.rotateService.processEnded();
            return ret;
        } catch (e) {
            this.rotateService.processEnded();
            throw e;
        }
    }

    async updateRoom(res: { id: string, name: string; floor: number; building: string; capacity: number }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/updateRooms';
            return await this.authService.sendAuthorizedRequest('POST', url, {rooms: [res]}, {});
        } finally {
            this.rotateService.processEnded();
        }
    }

    async addRoom(res: { id: string, name: string; floor: number; building: string; capacity: number }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/addRooms';
            return await this.authService.sendAuthorizedRequest('PUT', url, {rooms: [res]}, {});
        } finally {
            this.rotateService.processEnded();
        }
    }

    async deleteRooms(ids: string[]) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/deleteRooms';
            return await this.authService.sendAuthorizedRequest('PUT', url, {rooms: ids}, {});
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getUserWithRooms() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getUserWithRooms';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }
}
