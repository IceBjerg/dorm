import {EventEmitter, Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {RotateService} from './rotate.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuth: boolean = undefined;
    private restapiUrl: string;
    private token: string;
    private rToken: string;
    public expireToken = new EventEmitter();

    constructor(private httpClient: HttpClient, private configService: ConfigService, private router: Router, private rotateService: RotateService) {
    }

    public async init() {
        this.restapiUrl = this.configService.getData('restapiUrl');
        this.token = localStorage.getItem('accessToken');
        this.rToken = localStorage.getItem('refreshToken');
        this.isAuth = !!this.token;
    }

    public isLoggedIn() {
        return this.isAuth;
    }

    public async login(username: string, pw: string) {
        this.rotateService.processStarted();
        const url = this.restapiUrl + '/public/login';
        try {
            const res = await this.httpClient.post(url, {user: username, pw: pw}).toPromise() as {};
            if (res.hasOwnProperty('msg') && (res as { msg: any }).msg.hasOwnProperty('accessToken')) {
                this.isAuth = true;
                const res2 = res as { msg: { accessToken: string, refreshToken: string } };
                this.token = res2.msg.accessToken;
                this.rToken = res2.msg.refreshToken;
                localStorage.setItem('accessToken', res2.msg.accessToken);
                localStorage.setItem('refreshToken', res2.msg.refreshToken);
                this.rotateService.processEnded();
                return true;
            }
        } catch (e) {
            // todo: hibakezelés
        }
        this.rotateService.processEnded();
        return false;
    }

    public logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.token = null;
        this.rToken = null;
        this.isAuth = false;
    }

    async refreshToken() {
        const url = this.restapiUrl + '/public/refreshToken';
        const ret = await this.httpClient.post(url, { token: this.rToken}).toPromise();
        this.token = (ret as any)?.msg?.accessToken;
    }

    async sendRequest(type: string, url: string, body: any, options: any): Promise<any> {
        switch (type.toLowerCase()) {
            case 'post':
                return await this.httpClient.post(url, body, options).toPromise();
            case 'get':
                return await this.httpClient.get(url, options).toPromise();
            case 'put':
                return await this.httpClient.put(url, body, options).toPromise();
            default:
                return await this.httpClient.get(url, options).toPromise();
        }
    }

    async sendAuthorizedRequest(type: string, url: string, body: any, options: any): Promise<any> {
        this.rotateService.processStarted();
        options.headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        try {
            const ret = await this.sendRequest(type, url, body, options);
            this.rotateService.processEnded();
            return ret;
        } catch (e) {
            if (e instanceof HttpErrorResponse && e.status === 401 && this.rToken !== this.token) {
                try {
                    await this.refreshToken();
                    options.headers = new HttpHeaders({
                        'Authorization': 'Bearer ' + this.token
                    });
                    const ret = await this.sendRequest(type, url, body, options);
                    this.rotateService.processEnded();
                    return ret;
                } catch (e) { // refresh token has expired
                    this.logout();
                    this.router.navigateByUrl('login');
                    this.rotateService.processEnded();
                }
            } else if (this.rToken === this.token) {
                this.expireToken.emit(true);
                this.rotateService.processEnded();
            } else {
                this.rotateService.processEnded();
                throw e;
            }
        }

    }


}
