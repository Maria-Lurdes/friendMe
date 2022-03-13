import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {AuthService} from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.auth, 'this.auth')
        if (this.auth.isAuthenticated()) {
            req = req.clone({
                setParams: {
                    auth: this.auth.token
                }
            })
        }
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error, 'error.erro')
                console.log('interceptor error -', error.error.statusText);
                if(error.status === 401){
                    this.auth.signOut();
                    this.router.navigate(['/signin'], {
                        queryParams: {
                            authFailed: true
                        }
                    })
                }
                return throwError(error)
            })
        )
    }

}
