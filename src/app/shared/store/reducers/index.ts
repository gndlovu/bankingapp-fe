import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../../models/app-state.model";
import { AccountReducer } from "./account.reducer";

export const reducers: ActionReducerMap<AppState, any> = {
    account: AccountReducer
};
