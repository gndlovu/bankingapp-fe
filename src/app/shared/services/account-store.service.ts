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

    async getAccount(id: number) {
        if (!this.accounts.length) {
            console.log('here');
            await this.fetchAll();
        }
        console.log(this.accounts);
        // TODO - This can be executed quicker than the constructor. Figure out how to re-load state.
        return this.accounts.find(account => account.id === id);
    }

    async fetchAll() {
        this.accounts = await this._account.accountList().toPromise();
    }

    clear(): void {
        this.accounts = [];
    }
}
