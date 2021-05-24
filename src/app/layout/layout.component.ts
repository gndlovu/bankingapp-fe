import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/models/app-state.model';
import { GetAccountsAction } from '../shared/store/actions/account.actions';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    constructor(private _store: Store<AppState>) { }

    ngOnInit(): void {
        this._store.dispatch(new GetAccountsAction());
    }
}
