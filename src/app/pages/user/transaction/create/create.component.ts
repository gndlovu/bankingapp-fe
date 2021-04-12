import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../../shared/validators/form-fields.validator';
import { TransactionService } from '../../../../shared/services/transaction.service';
import { AccountService } from '../../../../shared/services/account.service';
import { AccountStoreService } from '../../../../shared/services/account-store.service';
import { Account } from '../../../../shared/models/account.model';

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
        private _accountStore: AccountStoreService
    ) { }

    async ngOnInit() {
        this.transactionType = this._route.snapshot.paramMap.get('type');
        const id = Number(this._route.snapshot.paramMap.get('account_id'));
        this.account = await this._accountStore.getAccount(id);

        this.f.type.setValue(this.transactionType);

        // Add account to transfer funds to.
        if (this.transactionType === 'transfer') {
            this._accountStore.accounts$.subscribe((accounts: Account[]) => {
                this.accounts = accounts.filter((a: Account) => a.id !== this.account?.id);
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

        this._transaction.create(this.account?.id, this.transactionForm.value).subscribe(_ => {
            // TODO - Update account balance and last update date in store
            this._router.navigate(['/transactions', this.account?.id, 'list']);
        }, (err: any) => {
            this._toastr.error(err.error.message);
        });
    }
}
