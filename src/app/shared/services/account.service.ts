import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private readonly API_BASE_URL = environment.API.BASE_URL;

    constructor(private _http: HttpClient) { }

    accountList(): Observable<any> {
        return this._http.get(`${this.API_BASE_URL}/bank/accounts/list`);
    }

    accountTypeList(): Observable<any> {
        return this._http.get(`${this.API_BASE_URL}/bank/accounts/types/list`);
    }

    bankBranchList(): Observable<any> {
        return this._http.get(`${this.API_BASE_URL}/bank/branches/list`);
    }

    create(data: { account_type_id: string; branch_id: string; account_no: string; overdraft: string; }): Observable<any> {
        return this._http.post(`${this.API_BASE_URL}/bank/accounts/add`, data);
    }

    getAccount(id: any): Observable<any> {
        return this._http.get(`${this.API_BASE_URL}/bank/accounts/${id}`);
    }
}
