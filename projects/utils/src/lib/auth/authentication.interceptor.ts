import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const rawUser = sessionStorage.getItem('AuthenticatedUser');
    if (!rawUser) {
      return next.handle(request);
    }

    const user = JSON.parse(rawUser);

    const authenticatedRequest = request.clone({
      headers: new HttpHeaders({
        'Authentication': JSON.stringify({ userId: user.id })
      })
    });
    return next.handle(authenticatedRequest);
  }
}
