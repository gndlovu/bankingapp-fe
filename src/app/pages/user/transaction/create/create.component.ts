import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ValidationService } from '../../../../shared/validators/form-fields.validator';
import { TransactionService } from '../../../../shared/services/transaction.service';
import { Account } from '../../../../shared/models/account.model';
import { Transaction } from '../../../../shared/models/transaction.model';
import { AppState } from '../../../../shared/models/app-state.model';
import { UpdateAccountAction } from '../../../../shared/store/actions/account.actions';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    account!: Account | undefined;
    transactionType: any;
    accounts!: Account[];

    transactionForm = new FormGroup({
        amount: new FormControl('', { validators: [Validators.required, ValidationService.numberValidator] }),
        reference: new FormControl('', Validators.required),
        type: new FormControl('')
    });

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _transaction: TransactionService,
        private _toastr: ToastrService,
        private _store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.transactionType = this._route.snapshot.paramMap.get('type');
        const accountId = Number(this._route.snapshot.paramMap.get('account_id'));

        const accounts$ = this._store.select(store => store.account.list);
        accounts$.subscribe(accounts => {
            this.account = accounts.find(account => account.id === accountId);
        });

        this.f.type.setValue(this.transactionType);

        // Add account to transfer funds to.
        if (this.transactionType === 'transfer') {
            accounts$.subscribe(accounts => {
                this.accounts = accounts.filter(account => account.id !== accountId);
            });

            this.transactionForm.addControl('to_account_id', new FormControl('', Validators.required));
        }
    }

    get f(): { [key: string]: AbstractControl } { return this.transactionForm.controls; }

    changeValue(e: any) {
        this.f.to_account_id.setValue(e.target.value);
    }

    onDeposit(): void {
        if (!this.transactionForm.dirty && !this.transactionForm.valid) {
            return;
        }

        this._transaction.create(this.account?.id, this.transactionForm.value).subscribe((transaction: Transaction) => {

            this._store.dispatch(new UpdateAccountAction(transaction.account));

            if (transaction.to_account) {
                this._store.dispatch(new UpdateAccountAction(transaction.to_account));
            }

            this._router.navigate(['/transactions', this.account?.id, 'list']);
        }, (err: any) => {
            this._toastr.error(err.error.message);
        });
    }
}
