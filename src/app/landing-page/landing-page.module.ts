import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import {FormsModule} from "@angular/forms";
import { CartComponent } from './cart/cart.component';
import {NzNotificationModule} from "ng-zorro-antd/notification";
import { IntroComponent } from './component/intro/intro.component';
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import { SearchComponent } from './component/search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    DetailProductComponent,
    CartComponent,
    IntroComponent,
    SearchComponent,
  ],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        FormsModule,
        NzNotificationModule,
        NzDrawerModule
    ]
})
export class LandingPageModule { }
