import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-email-verify',
    template: ''
})
export class EmailVerifyComponent implements OnInit {

    constructor(
        private _route: ActivatedRoute,
        private _auth: AuthService,
        private _toastr: ToastrService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        //This is just for redirecting, actual verification is in the API.
        this._route.queryParams.subscribe(params => {
            this._auth.verify(this._route.snapshot.paramMap.get('id'), params).subscribe(_ => { }, err => {
                this._toastr.error(err.error.message);
            });

            this._router.navigate(['/auth/login']);
        });
    }

}
