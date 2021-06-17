import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { reducers } from './shared/store/reducers';
import { environment } from '../environments/environment';
import { AccountEffects } from './shared/store/effects/account.effects';

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            timeOut: 10000 // 10 Secs
        }),
        LoadingBarRouterModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([AccountEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
