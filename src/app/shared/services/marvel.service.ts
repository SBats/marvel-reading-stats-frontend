import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { CONFIG } from '../../app.config';

@Injectable()
export class MarvelService {
  apiUrl: string = 'http://gateway.marvel.com:80/v1/public/';
  loading: boolean = false;
  config: any = CONFIG;

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

  getCommonParams(): string[] {
    const commonsParams = [];

    if (this.config.commonsParameters) {
      for (let key in this.config.commonsParameters) {
        if (this.config.commonsParameters.hasOwnProperty(key)) {
          commonsParams.push(key + '=' + this.config.commonsParameters[key]);
        }
      }
    }

    return commonsParams;
  }

  getPagination(pageNumber: number): string {
    let pagination = '';

    if (pageNumber > 1) {
      let offset = pageNumber - 1;
      if (this.config.commonsParameters && this.config.commonsParameters.limit) {
        offset *= this.config.commonsParameters.limit;
      } else {
        offset *= 20;
      }

      pagination = 'offset=' + offset;
    }

    return pagination;
  }

  getTypeList(type: string, startWithQuery?: string, page?: number): Observable<any> {
    let parameters = [
      'apikey=' + this.config.apiKey
    ];
    let url = this.apiUrl + type;

    if (typeof startWithQuery !== 'undefined' && startWithQuery !== null) {
      let newParam = '';

      if (type === 'series') {
        newParam += 'titleStartsWith';
      } else {
        newParam += 'nameStartsWith';
      }

      newParam += '=' + startWithQuery;

      parameters.push(newParam);
    }

    parameters = parameters.concat(this.getCommonParams());

    if (typeof page !== 'undefined' && page !== null) {
      parameters.push(this.getPagination(page));
    }
    parameters = parameters.filter(Boolean);
    url += '?' + parameters.join('&');


    this.loading = true;
    return this.http.request(url)
      .map(this.checkStatus)
      .map(this.parseJSON);
  }

  getComicsFromType(type: string, seriesId: number, page?: number): Observable<any> {
    let parameters = [
      'apikey=' + this.config.apiKey
    ];
    let url = this.apiUrl + type + '/' + seriesId + '/comics';

    parameters = parameters.concat(this.getCommonParams());

    if (typeof page !== 'undefined' && page !== null) {
      parameters.push(this.getPagination(page));
    }
    parameters = parameters.filter(Boolean);
    url += '?' + parameters.join('&');

    this.loading = true;
    return this.http.request(url)
      .map(this.checkStatus)
      .map(this.parseJSON);
  }
}
