import { Routes, RouterModule } from '@angular/router';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'email-verify/:id', component: EmailVerifyComponent },
        ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
