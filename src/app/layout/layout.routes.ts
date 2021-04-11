import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'accounts',
                loadChildren: () => import('../pages/user/account/account.module').then(m => m.AccountModule)
            },
            {
                path: 'transactions',
                loadChildren: () => import('../pages/user/transaction/transaction.module').then(m => m.TransactionModule)
            },
        ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
