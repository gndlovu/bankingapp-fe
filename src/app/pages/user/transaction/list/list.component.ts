import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../../shared/services/transaction.service';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    account: any;
    transactions: any;

    constructor(private _route: ActivatedRoute, private _transaction: TransactionService) { }

    ngOnInit(): void {
        this._route.data.subscribe((data: any) => {
            this.account = data.account;
            this._transaction.transactionHistory(this.account.id).subscribe(transactions => {
                this.transactions = transactions;
            });
        });
    }
}
