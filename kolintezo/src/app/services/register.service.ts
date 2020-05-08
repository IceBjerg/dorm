import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {RotateService} from './rotate.service';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private authService: AuthService, private configService: ConfigService, private httpClient: HttpClient,
                private rotateService: RotateService) {
    }

    async registerBunch(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('url', this.configService.getData('frontendURL'));
        const url = this.configService.getData('restapiUrl') + '/public/registerStudents';
        return await this.authService.sendAuthorizedRequest('POST', url, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    public async registerOne(body: { name: string, id: string, email: string }) {
        const newBody = body as any;
        newBody.url = this.configService.getData('frontendURL');
        const url = this.configService.getData('restapiUrl') + '/public/registerStudent';
        return await this.authService.sendAuthorizedRequest('POST', url, body, {});
    }

    public async newPassword(token: string, pw: string) {
        this.rotateService.processStarted();
        try {
            const url = this.configService.getData('restapiUrl') + '/public/addPw';
            return await this.httpClient.post(url, {pw, token}).toPromise();
        } finally {
            this.rotateService.processEnded();
        }
    }

}
