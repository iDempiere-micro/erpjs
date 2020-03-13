import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MobileAuthService } from '@erp/nativescript/core/services/mobile.auth.service';

@Injectable()
export class InterceptorService {
  constructor(private auth: MobileAuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenReq = req.clone({
      setHeaders: { Authorization: `Bearer ${this.auth.token}` }
    });
    return next.handle(tokenReq);
  }
}
