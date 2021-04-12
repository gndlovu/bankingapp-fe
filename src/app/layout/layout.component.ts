import { Component, OnInit } from '@angular/core';
import { AccountStoreService } from '../shared/services/account-store.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    constructor(public accountStore: AccountStoreService) { }

    ngOnInit(): void {
        this.accountStore.fetchAll();
    }
}
