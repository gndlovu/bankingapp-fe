import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListComponent },
            { path: 'create', component: CreateComponent },
        ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
