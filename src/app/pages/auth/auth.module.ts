import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './auth.routes';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        ROUTES
    ]
})
export class AuthModule { }
