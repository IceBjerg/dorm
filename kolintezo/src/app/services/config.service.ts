import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private data;
  constructor(private httpClient: HttpClient) {
  }

  async init() {
    const url = 'assets/config/config.' + (environment.production ? 'prod' : 'dev') + '.json';
    this.data = await this.httpClient.get(url).toPromise();
  }

  getData(key: string) {
    if (this.data.hasOwnProperty(key)) {
      return this.data[key];
    }
    return null;
  }
}
