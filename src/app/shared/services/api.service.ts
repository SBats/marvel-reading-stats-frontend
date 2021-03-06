import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../../app.config';

@Injectable()
export class ApiService {
  apiUrl: string = CONFIG.apiUrl;
  loading: boolean = false;

  constructor(private http: Http) {}

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

  getTypeList(type: string, startWithQuery?: string): Observable<any> {
    let parameters = [];
    let url = `${this.apiUrl}${type}`;

    if (typeof startWithQuery !== 'undefined' && startWithQuery !== null) {
      let query = startWithQuery === '#' ? '[0-9]' : startWithQuery;
      parameters.push(`startWith=${query}`);
    }
    parameters = parameters.filter(Boolean);
    url += '?' + parameters.join('&');


    this.loading = true;
    return this.http.request(url)
      .map(this.checkStatus)
      .map(this.parseJSON);
  }

  getElementDetail(type: string, id: string | number): Observable<any> {
    let url = `${this.apiUrl}${type}/${id}`;

    this.loading = true;
    return this.http.request(url)
      .map(this.checkStatus)
      .map(this.parseJSON);
  }
}
