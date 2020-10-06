import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headerSettings = {};
        for (const key of req.headers.keys()) {
          headerSettings[key] = req.headers.getAll(key);
        }
        if (!!user && user.getToken()) {
          headerSettings['Authorization'] = `Bearer ${user.getToken()}`;
        }

        headerSettings['Content-Type'] = 'application/json';
        const newHeaders = new HttpHeaders(headerSettings);

        const modifiedReq = req.clone({
          headers: newHeaders,
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
