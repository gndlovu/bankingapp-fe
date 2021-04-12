import { Component, OnInit } from '@angular/core';
import { AccountStoreService } from '../../../../shared/services/account-store.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    constructor(public accountStore: AccountStoreService) { }

    ngOnInit(): void { }
}
