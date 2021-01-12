import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request is on its way... ');
    console.log(request.url);
    const modifiedReq = request.clone({
      headers: request.headers.append('Auth_name', 'xyz_value')
    });
    return next.handle(modifiedReq);
  }
}
