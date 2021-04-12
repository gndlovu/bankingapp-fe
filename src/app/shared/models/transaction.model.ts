import { Account } from "./account.model";

export interface Transaction {
    id: number;
    reference: string;
    amount: string;
    created_at: string;
    type: string;
    account: Account;
    to_account?: Account;
}
