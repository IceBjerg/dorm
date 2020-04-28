import { Injectable } from '@angular/core';
import {RotateService} from './rotate.service';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

    constructor(private rotateService: RotateService, private authService: AuthService, private configService: ConfigService) {
    }

    async getKeyData() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getKeyData';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async keyReceived(data: { id: number }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/keyReceived';
            return (await this.authService.sendAuthorizedRequest('POST', url, data, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async keyTaken(param: { takenBy: any; key: number }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/keyTaken';
            return (await this.authService.sendAuthorizedRequest('POST', url, param, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getKeyDataHist() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getKeyDataHist';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }
}
