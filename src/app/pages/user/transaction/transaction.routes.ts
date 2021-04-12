import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: ':account_id/list', component: ListComponent },
            { path: ':account_id/:type', component: CreateComponent },
        ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
