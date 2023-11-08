import { Injectable } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptorService implements HttpInterceptor{

  constructor(private authentService:AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authentService.jwtToken;
    const clone = req.clone({setHeaders:{Authorization:`Bearer ${jwt}`}})
    return next.handle(clone);
  }

}
