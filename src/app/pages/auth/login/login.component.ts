import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ValidationService } from '../../../shared/validators/form-fields.validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl('', { validators: [Validators.required, ValidationService.emailValidator] }),
        password: new FormControl('', Validators.required),
    });

    constructor(private _auth: AuthService, private _router: Router, private _toastr: ToastrService) { }

    ngOnInit(): void {
    }

    get f(): { [key: string]: AbstractControl } { return this.loginForm.controls; }

    onLogin(): void {
        if (!this.loginForm.dirty && !this.loginForm.valid) {
            return;
        }

        this._auth.login(this.loginForm.value).subscribe(_ => {
            this._router.navigate(['/']);
        }, (err: any) => {
            switch (err.status) {
                case 401:
                    this._toastr.error('Credentials invalid, please try again.')
                    break;
                case 400:
                    this._auth.resendVerification(this.f.email.value).subscribe(_ => {
                        this._toastr.error('Email not verified. Check your email for a verification link.');
                    });
                    break;
                case 301:
                    // toDo - Google Two-Factor authentication
                    break;
                default:
                    break;
            }
        });
    }
}
