import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Jwt } from '../models/jwt';
import { environment } from '../../../environments/environment';
import { Register } from '../models/register';
import { Login } from '../models/login';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly JWT = 'JWT';
    private readonly API_BASE_URL = environment.API.BASE_URL;

    constructor(private _http: HttpClient) { }

    login(data: Login): Observable<any> {
        return this._http.post(`${this.API_BASE_URL}/auth/login`, data).pipe(
            tap(auth => { localStorage.setItem(this.JWT, JSON.stringify(auth)) })
        );
    }

    register(data: Register): Observable<any> {
        return this._http.post(`${this.API_BASE_URL}/auth/register`, data);
    }

    verify(user_id: any, params: any): Observable<any> {
        return this._http.get(`${this.API_BASE_URL}/auth/email/verify/${user_id}`, {
            params: new HttpParams({ fromObject: params })
        });
    }

    resendVerification(email: string): Observable<any> {
        return this._http.post(`${this.API_BASE_URL}/auth/email/resend`, { email });
    }

    profile(): Observable<any> {
        return this._http.get(`${this.API_BASE_URL}/auth/me`);
    }

    logout(): Observable<any> {
        return this._http.post(`${this.API_BASE_URL}/auth/logout`, {}).pipe(
            tap(_ => { this.removeJwt() })
        );
    }

    get jwt(): Jwt | null {
        const jwt = localStorage.getItem(this.JWT);
        return jwt ? JSON.parse(jwt) : null;
    }

    removeJwt(): void {
        localStorage.removeItem(this.JWT);
    }

    isAuthenticated(): boolean {
        return !!this.jwt;
    }
}
