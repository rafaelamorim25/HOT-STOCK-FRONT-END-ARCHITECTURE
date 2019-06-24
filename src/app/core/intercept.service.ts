import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


      console.log('Entrou no interceptador');

        if (localStorage.getItem('Authorization')) {
            request = request.clone({
                setHeaders: {
                    Authorization: localStorage.getItem('Authorization')
                }
            });
            console.log('O que vai ser enviado ao servidor: ', request.headers.get('Authorization'));
        }
        return next.handle(request);
    }
}
