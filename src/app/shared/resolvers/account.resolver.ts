import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AccountResolver implements Resolve<any> {
    constructor(private _account: AccountService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this._account.getAccount(route.url[0].path);
    }
}
