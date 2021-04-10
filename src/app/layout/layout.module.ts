import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './layout.routes';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DropdownDirective } from '../shared/directives/dropdown.directive';

@NgModule({
    declarations: [LayoutComponent, NavbarComponent, DropdownDirective],
    imports: [
        CommonModule,
        ROUTES
    ]
})
export class LayoutModule { }
