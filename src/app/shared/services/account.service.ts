import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from '../models/account.model';
import { NewAccount } from '../models/new-account.model';
import { AccountType } from '../models/account-type.model';
import { BankBranch } from '../models/bank-branch.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private readonly API_BASE_URL = environment.API.BASE_URL;

    constructor(private _http: HttpClient) { }

    accountList(): Observable<Account[]> {
        return this._http.get<Account[]>(`${this.API_BASE_URL}/bank/accounts/list`);
    }

    accountTypeList(): Observable<AccountType[]> {
        return this._http.get<AccountType[]>(`${this.API_BASE_URL}/bank/accounts/types/list`);
    }

    bankBranchList(): Observable<BankBranch[]> {
        return this._http.get<BankBranch[]>(`${this.API_BASE_URL}/bank/branches/list`);
    }

    create(data: NewAccount): Observable<Account> {
        return this._http.post<Account>(`${this.API_BASE_URL}/bank/accounts/add`, data);
    }

    getAccount(id: number): Observable<Account> {
        return this._http.get<Account>(`${this.API_BASE_URL}/bank/accounts/${id}`);
    }
}
