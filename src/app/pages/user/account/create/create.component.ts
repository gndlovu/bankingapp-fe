import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ValidationService } from '../../../../shared/validators/form-fields.validator';
import { AccountService } from '../../../../shared/services/account.service';
import { AppState } from '../../../../shared/models/app-state.model';
import { CreateAccountAction } from '../../../../shared/store/actions/account.actions';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    branches: any;
    accountTypes: any;
    accountForm = new FormGroup({
        branch_id: new FormControl('', Validators.required),
        account_type_id: new FormControl('', Validators.required),
        account_no: new FormControl('', { validators: [Validators.required, ValidationService.accountNumberValidator] }),
        overdraft: new FormControl('0', { validators: [Validators.required, ValidationService.numberValidator] }),
    });

    constructor(private _account: AccountService, private _router: Router, private _store: Store<AppState>) { }

    get f(): { [key: string]: AbstractControl } { return this.accountForm.controls; }

    ngOnInit(): void {
        forkJoin([this._account.accountTypeList(), this._account.bankBranchList()]).subscribe((result) => {
            this.accountTypes = result[0];
            this.branches = result[1];
        })
    }

    changeValue(field: AbstractControl, e: any) {
        field.setValue(e.target.value);
    }

    onCreateAccount(): void {
        if (!this.accountForm.dirty && !this.accountForm.valid) {
            return;
        }

        this._store.dispatch(new CreateAccountAction(this.accountForm.value));

        this._router.navigate(['/accounts/list']);
    }
}
