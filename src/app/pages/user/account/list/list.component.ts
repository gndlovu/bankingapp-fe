import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    accounts: any;
    constructor(private _account: AccountService) { }

    ngOnInit(): void {
        this._account.accountList().subscribe(accounts => {
            this.accounts = accounts;
        });
    }
}
