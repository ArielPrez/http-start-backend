import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request is on its way... ');
    console.log(request.url);
    const modifiedReq = request.clone({
      headers: request.headers.append('Auth_name', 'xyz_value')
    });
    // To manipulate the response, with an observable (.pipe)
    return next.handle(modifiedReq).pipe(tap(
      (event) => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Respose arrived, status & body data: \n' + event.status);
          console.log(event.body);
          console.log('\n');
        }
      }
    ));
  }
}
