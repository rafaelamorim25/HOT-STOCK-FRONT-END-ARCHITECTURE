import { Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpXsrfCookieExtractor } from '@angular/common/http/src/xsrf';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient){}

  login(user: User){
    console.log(JSON.stringify(user));
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const resp: Observable<HttpResponse<any>> = this.http.post<HttpResponse<any>>
    ('http://localhost:8080/login', user, {headers: headers, observe: 'response'});

    resp.subscribe(
      r => localStorage.setItem('Authorization', r.headers.get('Authorization'))
    );

    console.log('Autorização armazenada: ', localStorage.getItem('Authorization'));
  }

  logout() {
    localStorage.removeItem('Authorization');
  }
}
