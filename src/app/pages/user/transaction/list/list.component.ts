import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountStoreService } from 'src/app/shared/services/account-store.service';
import { TransactionService } from '../../../../shared/services/transaction.service';
import { Account } from '../../../../shared/models/account.model';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    account: Account | undefined;
    transactions: any;

    constructor(private _route: ActivatedRoute, private _transaction: TransactionService, public accountStore: AccountStoreService) { }

    ngOnInit(): void {
        const id = Number(this._route.snapshot.paramMap.get('account_id'));
        this._transaction.transactionHistory(id).subscribe(transactions => {
            this.transactions = transactions;
            this.account = this.accountStore.getAccount(id);
        });
    }
}
