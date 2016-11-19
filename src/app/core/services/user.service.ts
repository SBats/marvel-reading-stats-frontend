import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import '../../rxjs-operators';

@Injectable()
export class UserService {
  token: string = null;
  constructor(private http: Http) { }

  login(credentials): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = 'http://localhost:8000/api-token-auth/';
    return this.http.post(url, {
      username: credentials.username,
      password: credentials.password
    }, options)
      .toPromise()
      .then((res: Response) => res.json())
      .then(json => this.token = json.token)
      .catch((err: Response) => console.error(err));
  }

}
