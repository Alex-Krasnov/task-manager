import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
        setHeaders: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    });
    
    return next.handle(modifiedReq);
  }
}