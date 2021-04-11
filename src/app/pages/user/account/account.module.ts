import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from './account.routes';
import { ThreeOLoaderModule } from '../../../shared/components/control-messages/three-o-loader/three-o-loader.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ControlMessagesModule } from '../../../shared/components/control-messages/control-messages.module';

@NgModule({
    declarations: [ListComponent, CreateComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ROUTES,
        ThreeOLoaderModule,
        ControlMessagesModule
    ]
})
export class AccountModule { }
