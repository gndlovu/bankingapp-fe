import { Routes, RouterModule } from '@angular/router';
import { AccountResolver } from '../../../shared/resolvers/account.resolver';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: ':account_id/list', component: ListComponent, resolve: { account: AccountResolver } },
            { path: ':account_id/:type', component: CreateComponent, resolve: { account: AccountResolver } },
        ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
