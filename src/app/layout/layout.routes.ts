import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'accounts', pathMatch: 'full' },
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
