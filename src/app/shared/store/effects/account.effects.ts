import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AccountService } from "../../services/account.service";
import { AccountAction, AccountActionTypes, CreateAccountAction, CreateAccountFailureAction, CreateAccountSuccessAction, GetAccountsAction, GetAccountsFailureAction, GetAccountsSuccessAction } from "../actions/account.actions";

@Injectable()
export class AccountEffects {
    @Effect() getAccounts$ = this._actions$.pipe(
        ofType<GetAccountsAction>(AccountActionTypes.GET_ACCOUNTS),
        mergeMap(() => this._accountService.accountList().pipe(
            map(data => new GetAccountsSuccessAction(data)),
            catchError(err => of(new GetAccountsFailureAction(err)))
        ))
    );

    @Effect() createAccount$ = this._actions$.pipe(
        ofType<CreateAccountAction>(AccountActionTypes.CREATE_ACCOUNT),
        mergeMap(data => this._accountService.create(data.payload).pipe(
            map(data => new CreateAccountSuccessAction(data)),
            catchError(error => of(new CreateAccountFailureAction(error)))
        ))
    );

    constructor(private _actions$: Actions, private _accountService: AccountService) { }
}
