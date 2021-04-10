import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from './auth.routes';
import { LoginComponent } from './login/login.component';
import { ControlMessagesModule } from '../../shared/components/control-messages/control-messages.module';
import { ThreeOLoaderModule } from '../../shared/components/control-messages/three-o-loader/three-o-loader.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ROUTES,
        ControlMessagesModule,
        ThreeOLoaderModule
    ]
})
export class AuthModule { }
