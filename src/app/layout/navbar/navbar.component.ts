import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    profile: any;
    isNavbarCollapsed = true;

    constructor(private _auth: AuthService, private _router: Router) { }

    ngOnInit(): void {
        this._auth.profile().subscribe(profile => {
            this.profile = profile;
        });
    }

    onLogout(): void {
        this._auth.logout().subscribe(_ => {
            this._router.navigate(['/auth']);
        });
    }
}
