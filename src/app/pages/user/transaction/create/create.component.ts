import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../../shared/validators/form-fields.validator';
import { TransactionService } from '../../../../shared/services/transaction.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    account: any;
    transactionType: any;

    depositForm = new FormGroup({
        amount: new FormControl('', { validators: [Validators.required, ValidationService.numberValidator] }),
        my_reference: new FormControl('', Validators.required),
        type: new FormControl('')
    });

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _transaction: TransactionService,
        private _toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.transactionType = this._route.snapshot.paramMap.get('type');
        this._route.data.subscribe((data: any) => {
            this.account = data.account;
        });

        this.f.type.setValue(this.transactionType);
    }

    get f(): { [key: string]: AbstractControl } { return this.depositForm.controls; }

    onDeposit(): void {
        if (!this.depositForm.dirty && !this.depositForm.valid) {
            return;
        }

        this._transaction.create(this.account.id, this.depositForm.value).subscribe(_ => {
            this._router.navigate(['/transactions', this.account.id, 'list']);
        }, (err: any) => {
            this._toastr.error(err.error.message);
        });
    }
}
