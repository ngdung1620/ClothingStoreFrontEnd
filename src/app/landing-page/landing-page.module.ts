import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import {FormsModule} from "@angular/forms";
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    DetailProductComponent,
    CartComponent
  ],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        FormsModule
    ]
})
export class LandingPageModule { }
