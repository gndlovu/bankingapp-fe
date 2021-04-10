import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _errHandler: ErrorHandlerService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((res: HttpErrorResponse) => {
                /**
                 * * Unauthenticated
                 * ? Why would the API return status code 500 instead of 401
                 * TODO: refactor this so that it can better handle unauthenticated users and use the refresh token.
                 */
                if (res.error.message === 'Unauthenticated.') {
                    // this._tokenStorage.signOut();
                }

                this._errHandler.handle(res);

                return throwError(res);
            })
        );
    }
}
