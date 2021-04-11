import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../../shared/validators/form-fields.validator';
import { TransactionService } from '../../../../shared/services/transaction.service';
import { AccountService } from '../../../../shared/services/account.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    account: any;
    transactionType: any;
    accounts: any;

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
        private _account: AccountService
    ) { }

    ngOnInit(): void {
        this.transactionType = this._route.snapshot.paramMap.get('type');
        this._route.data.subscribe((data: any) => {
            this.account = data.account;
        });

        this.f.type.setValue(this.transactionType);

        // Add account to transfer funds to.
        if (this.transactionType === 'transfer') {
            this._account.accountList().subscribe(accounts => {
                this.accounts = accounts.filter((a: any) => a.id !== this.account.id);
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

        this._transaction.create(this.account.id, this.transactionForm.value).subscribe(_ => {
            this._router.navigate(['/transactions', this.account.id, 'list']);
        }, (err: any) => {
            this._toastr.error(err.error.message);
        });
    }
}
