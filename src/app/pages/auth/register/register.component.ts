import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { ValidationService } from '../../../shared/validators/form-fields.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', { validators: [Validators.required, ValidationService.emailValidator] }),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            ValidationService.passwordStrengthValidator()]
        ),
        password_confirmation: new FormControl('', [Validators.required])
    }, ValidationService.passwordMatch('password', 'password_confirmation'));

    constructor(private _auth: AuthService, private _toastr: ToastrService) { }

    ngOnInit(): void { }

    get f(): { [key: string]: AbstractControl } { return this.registerForm.controls; }

    onRegister(): void {
        if (this.registerForm.invalid) {
            return;
        }

        this._auth.register(this.registerForm.value).subscribe(_ => {
            this._toastr.success('Account successfully created! Check your email for a verification link.');
        });
    }
}
