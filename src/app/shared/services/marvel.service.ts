import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { CONFIG } from '../../app.config.ts';

@Injectable()
export class MarvelService {
  apiUrl: string = 'http://gateway.marvel.com:80/v1/public/';
  loading: boolean = false;

  constructor(public http: Http) {}

  checkStatus(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  parseJSON(response: Response): Response {
    return response.json();
  }

  getComics(): Observable<any> {
    this.loading = true;
    return this.http.request('/data/comics.mock.json')
      .map(this.checkStatus)
      .map(this.parseJSON);
  }

  getTypeList(type: string): Observable<any> {
    let parameters = [
      'apikey=' + CONFIG.apiKey
    ];
    let url = this.apiUrl + type;

    url = url + '?' + parameters.join('&');

    if (CONFIG.commonsParameters && CONFIG.commonsParameters.length > 0) {
      url = url + '&' + CONFIG.commonsParameters.join('&');
    }

    this.loading = true;
    return this.http.request(url)
      .map(this.checkStatus)
      .map(this.parseJSON);
  }

  getComicsFromType(type:string, seriesId: number): Observable<any> {
    let parameters = [
      'apikey=' + CONFIG.apiKey
    ];
    let url = this.apiUrl + type + '/' + seriesId + '/comics';

    url = url + '?' + parameters.join('&');

    if (CONFIG.commonsParameters && CONFIG.commonsParameters.length > 0) {
      url = url + '&' + CONFIG.commonsParameters.join('&');
    }

    this.loading = true;
    return this.http.request(url)
      .map(this.checkStatus)
      .map(this.parseJSON);
  }
}
