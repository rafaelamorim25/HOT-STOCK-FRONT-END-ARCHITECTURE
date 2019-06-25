import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private router: Router){}

  login(user: User){
    console.log(JSON.stringify(user));
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const resp: Observable<HttpResponse<any>> = this.http.post<HttpResponse<any>>
    ('http://localhost:8080/login', user, {headers: headers, observe: 'response'});

    resp.subscribe(
      r => {
          if(r.headers.get('Authorization') !== null){
            localStorage.setItem('Authorization', r.headers.get('Authorization'));
            this.router.navigate(['/home']);
          }
      }
    );
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['/login']);
  }
}
