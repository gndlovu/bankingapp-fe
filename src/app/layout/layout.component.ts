import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    constructor(private _auth: AuthService, private _router: Router) { }

    ngOnInit(): void {
    }

    onLogout(): void {
        this._auth.logout().subscribe(_ => {
            this._router.navigate(['/auth']);
        });
    }
}
