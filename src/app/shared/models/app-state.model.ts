import { AccountState } from "../store/reducers/account.reducer";

export interface AppState {
    readonly account: AccountState;
};
