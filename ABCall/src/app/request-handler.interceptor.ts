import { Injectable } from "@angular/core";
import { AuthService } from "./service/auth-service.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     debugger;
     if (httpRequest.url.includes('cognito')

    ) {
          return next.handle(httpRequest);
     }
     const jwt = localStorage.getItem('id_token')
     return next.handle(httpRequest.clone({ setHeaders: { authorization: `Bearer ${jwt}`  }
  }));
  }
}
