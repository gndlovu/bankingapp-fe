import { Action } from '@ngrx/store';
import { Account } from '../../models/account.model';
import { NewAccount } from '../../models/new-account.model';

export enum AccountActionTypes {
    GET_ACCOUNTS = '[ACCOUNT] Get accounts',
    GET_ACCOUNTS_SUCCESS = '[ACCOUNT] Get accounts success',
    GET_ACCOUNTS_FAILURE = '[ACCOUNT] Get accounts failure',
    CREATE_ACCOUNT = '[ACCOUNT] Create account',
    CREATE_ACCOUNT_SUCCESS = '[ACCOUNT] Create account success',
    CREATE_ACCOUNT_FAILURE = '[ACCOUNT] Create account failure',
    UPDATE_ACCOUNT = '[ACCOUNT] Update account'
}

export class GetAccountsAction implements Action {
    readonly type = AccountActionTypes.GET_ACCOUNTS;
}

export class GetAccountsSuccessAction implements Action {
    readonly type = AccountActionTypes.GET_ACCOUNTS_SUCCESS;

    constructor(public payload: Account[]) { }
}

export class GetAccountsFailureAction implements Action {
    readonly type = AccountActionTypes.GET_ACCOUNTS_FAILURE;

    constructor(public payload: Error) { }
}

export class CreateAccountAction implements Action {
    readonly type = AccountActionTypes.CREATE_ACCOUNT;

    constructor(public payload: NewAccount) { }
}

export class CreateAccountSuccessAction implements Action {
    readonly type = AccountActionTypes.CREATE_ACCOUNT_SUCCESS;

    constructor(public payload: Account) { }
}

export class CreateAccountFailureAction implements Action {
    readonly type = AccountActionTypes.CREATE_ACCOUNT_FAILURE;

    constructor(public payload: Error) { }
}

export class UpdateAccountAction implements Action {
    readonly type = AccountActionTypes.UPDATE_ACCOUNT;

    constructor(public payload: Account) { }
}

export type AccountAction =
    | GetAccountsAction
    | GetAccountsSuccessAction
    | GetAccountsFailureAction
    | CreateAccountAction
    | CreateAccountSuccessAction
    | CreateAccountFailureAction
    | UpdateAccountAction;
