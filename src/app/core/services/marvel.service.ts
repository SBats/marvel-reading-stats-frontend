import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import '../../rxjs-operators';

@Injectable()
export class MarvelService {
  apiURL: string = 'http://localhost:8000/';
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
    let url = `${this.apiURL}${type}/`;

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
}
