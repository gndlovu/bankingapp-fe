import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './layout.routes';
import { LayoutComponent } from './layout.component';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        ROUTES
    ]
})
export class LayoutModule { }
