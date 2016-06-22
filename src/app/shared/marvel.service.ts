import { Injectable, provide } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

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

  getComics(): Observable<Response> {
    this.loading = true;
    return this.http.request('/data/comics.mock.json')
      .map(this.checkStatus)
      .map(this.parseJSON);
  }

  getSeries(): Observable<Response> {
    this.loading = true;
    return this.http.request('/data/series.mock.json')
      .map(this.checkStatus)
      .map(this.parseJSON);
  }
}

export var MARVEL_PROVIDERS: Array<any> = [
  provide(MarvelService, {useClass: MarvelService})
];
