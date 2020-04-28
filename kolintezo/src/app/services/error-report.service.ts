import {Injectable} from '@angular/core';
import {RotateService} from './rotate.service';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorReportService {

    constructor(private rotateService: RotateService, private authService: AuthService, private configService: ConfigService) {
    }

    async addError(res: { issue: any; needTranslate: any; location: any; type: string }) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/addErrorReport';
            return (await this.authService.sendAuthorizedRequest('POST', url, res, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getForeignText() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getForeignText';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async translateError(id: number, value: string) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/translateErrorReport';
            return (await this.authService.sendAuthorizedRequest('POST', url, {id: id, text: value}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getMaintenanceWork() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getMaintenanceWork';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async maintenanceDone(id: number) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/maintenanceDone';
            return (await this.authService.sendAuthorizedRequest('POST', url, {id: id }, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }

    async getErrorHistoryUser() {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/getErrorHistoryUser';
            return (await this.authService.sendAuthorizedRequest('GET', url, {}, {}) as any).msg;
        } finally {
            this.rotateService.processEnded();
        }
    }
}
