import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        function getAccessToken() {
            let accessToken = localStorage.getItem('access_token');

            if (accessToken === null) {
                console.warn("ACCESS TOKEN IS NULL");
            } else {
                console.log(accessToken);
            }

            return accessToken;
        }
        req = req.clone({
            setHeaders: {
                'Content-Type' : 'application/json; charset=utf-8',
                'Accept'       : 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            }
        });

        return next.handle(req);
    }
}