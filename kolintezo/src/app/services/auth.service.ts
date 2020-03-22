import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean = undefined;
  private restapiUrl: string;
  private token: string;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
  }

  public async init() {
    await this.configService.init();
    this.restapiUrl = this.configService.getData('restapiUrl');
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.token = accessToken;
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
    // this.isAuth = true;
  }

  public isLoggedIn() {
    return this.isAuth;
  }

  public async login(username: string, pw: string) {

    const url = this.restapiUrl + '/public/login';
    try {
      const res  = await this.httpClient.post(url,  { user: username, pw: pw}).toPromise() as {};
      if (res.hasOwnProperty('msg') && res['msg'].hasOwnProperty('accessToken')) {
         this.isAuth = true;
         localStorage.setItem('accessToken', res['msg']['accessToken']);
         localStorage.setItem('refreshToken', res['msg']['refreshToken']);
      }
    } catch (e) {
      // todo: hibakezelés
    }
  }

  public async logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.token = null;
    this.isAuth = false;
  }


}
