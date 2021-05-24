import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransactionService } from '../../../../shared/services/transaction.service';
import { Account } from '../../../../shared/models/account.model';
import { AppState } from '../../../../shared/models/app-state.model';
import { Transaction } from '../../../../shared/models/transaction.model';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    account!: Account | undefined;
    transactions$!: Observable<Transaction[]>;

    constructor(
        private _route: ActivatedRoute,
        private _transaction: TransactionService,
        private _store: Store<AppState>
    ) { }

    ngOnInit() {
        const accountId = Number(this._route.snapshot.paramMap.get('account_id'));

        this.transactions$ = this._transaction.transactionHistory(accountId);

        this._store.select(store => store.account.list).subscribe(accounts => {
            this.account = accounts.find(account => account.id === accountId);
        });
    }
}
