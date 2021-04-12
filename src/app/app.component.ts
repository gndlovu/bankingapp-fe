import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <router-outlet></router-outlet>
    <ngx-loading-bar></ngx-loading-bar>
    `
})
export class AppComponent { }
