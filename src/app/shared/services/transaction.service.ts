import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction } from '../models/transaction.model';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private readonly API_BASE_URL = environment.API.BASE_URL;

    constructor(private _http: HttpClient) { }

    transactionHistory(account_id: any): Observable<any> {
        return this._http.get(`${this.API_BASE_URL}/bank/transactions/${account_id}/list`);
    }

    create(account_id: number | undefined, transaction: any): Observable<Transaction> {
        return this._http.post<Transaction>(`${this.API_BASE_URL}/bank/transactions/${account_id}/create`, transaction);
    }
}
