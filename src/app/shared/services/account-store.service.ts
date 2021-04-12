import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account.model';
import { NewAccount } from '../models/new-account.model';
import { AccountService } from './account.service';

@Injectable({
    providedIn: 'root'
})
export class AccountStoreService {

    private readonly _accounts = new BehaviorSubject<Account[]>([]);
    readonly accounts$ = this._accounts.asObservable();

    constructor(private _account: AccountService) { }

    get accounts(): Account[] {
        return this._accounts.getValue();
    }

    set accounts(account: Account[]) {
        this._accounts.next(account);
    }

    async addAccount(data: NewAccount): Promise<boolean> {
        try {
            const account = await this._account.create(data).toPromise();

            this.accounts.push(account);

            return true;
        } catch (e) {
            return false;
        }
    }

    updateAccount(account: Account): void {
        const index = this.accounts.findIndex(a => a.id === account.id);
        this.accounts[index] = account;
    }

    async getAccount(id: number): Promise<Account | undefined> {
        if (!this.accounts.length) {
            await this.fetchAll();
        }

        return this.accounts.find(account => account.id === id);
    }

    async fetchAll() {
        this.accounts = await this._account.accountList().toPromise();
    }

    clear(): void {
        this.accounts = [];
    }
}
