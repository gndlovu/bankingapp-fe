import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from '../../../../shared/models/account.model';
import { AppState } from '../../../../shared/models/app-state.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    accounts$!: Observable<Account[]>;
    loading$!: Observable<boolean>;
    err$!: Observable<Error | undefined>;

    constructor(private _store: Store<AppState>) { }

    ngOnInit(): void {
        this.accounts$ = this._store.select(store => store.account.list);
        this.loading$ = this._store.select(store => store.account.loading);
        this.err$ = this._store.select(store => store.account.err);
    }
}
