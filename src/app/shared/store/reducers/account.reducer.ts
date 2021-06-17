import { Account } from "../../models/account.model";
import { AccountAction, AccountActionTypes } from "../actions/account.actions";

export interface AccountState {
    list: Account[],
    loading: boolean,
    err: Error | undefined
};

const initialState: AccountState = {
    list: [],
    loading: false,
    err: undefined
};

export function AccountReducer(state: AccountState = initialState, action: AccountAction) {
    switch (action.type) {
        case AccountActionTypes.GET_ACCOUNTS:
            return { ...state, loading: true };

        case AccountActionTypes.GET_ACCOUNTS_SUCCESS:
            return { ...state, list: action.payload, loading: false };

        case AccountActionTypes.GET_ACCOUNTS_FAILURE:
            return { ...state, err: action.payload, loading: false };

        case AccountActionTypes.CREATE_ACCOUNT:
            return { ...state, loading: true };

        case AccountActionTypes.CREATE_ACCOUNT_SUCCESS:
            return { ...state, list: [...state.list, action.payload], loading: false };

        case AccountActionTypes.CREATE_ACCOUNT_FAILURE:
            return { ...state, err: action.payload, loading: false };

        case AccountActionTypes.UPDATE_ACCOUNT:
            return { ...state, list: state.list.map(account => account.id === action.payload.id ? action.payload : account) };
        default:
            return state;
    }
}
