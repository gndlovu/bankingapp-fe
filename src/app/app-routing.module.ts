import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { GuestGuard } from './shared/guards/guest.guard';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
    }, {
        path: 'auth',
        canActivate: [GuestGuard],
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
    }, {
        path: 'error', component: ErrorComponent
    }, {
        path: '**', component: ErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
