import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import { LandingPageComponent } from './landing-page/landing-page.component';
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {JwtModule} from "@auth0/angular-jwt";
import { LoadingComponent } from './core/component/loading/loading.component';
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";
import {NotFoundComponent} from "./core/component/not-found/not-found.component";
import {NzDrawerModule} from "ng-zorro-antd/drawer";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoadingComponent,
    NotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzButtonModule,
        NzIconModule,
        NzBadgeModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return sessionStorage.getItem("token");
                },
            },
        }),
        NzDrawerModule,
    ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
