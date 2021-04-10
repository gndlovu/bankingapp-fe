import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Jwt } from '../models/jwt';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly JWT = 'JWT';
    private readonly API_BASE_URL = environment.API.BASE_URL;

    constructor(private _http: HttpClient) { }

    login(data: any): Observable<any> {
        return this._http.post(`${this.API_BASE_URL}/auth/login`, data).pipe(
            tap(auth => { localStorage.setItem(this.JWT, JSON.stringify(auth)) })
        );
    }

    logout(): Observable<any> {
        return this._http.post(`${this.API_BASE_URL}/auth/logout`, {}).pipe(
            tap(_ => { localStorage.removeItem(this.JWT) })
        );
    }

    get jwt(): Jwt | null {
        const jwt = localStorage.getItem(this.JWT);
        return jwt ? JSON.parse(jwt) : null;
    }

    isAuthenticated(): boolean {
        return !!this.jwt;
    }
}
