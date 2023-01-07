import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AdminInterseptor implements HttpInterceptor {
  
  constructor(private authSvc: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('ADMIN_ROLE')) {
      const authToken = this.authSvc.userTokenValue;
      
      const authReq = req.clone({
        setHeaders: {
          auth: authToken,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
