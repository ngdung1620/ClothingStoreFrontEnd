import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page.component";
import {HomeComponent} from "./component/home/home.component";
import {ProductComponent} from "./component/product/product.component";
import {DetailProductComponent} from "./component/detail-product/detail-product.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {path: '', component: HomeComponent},
      {path:'product', component: ProductComponent},
      {path: 'detail-product', component: DetailProductComponent},
      {path: 'cart', component: CartComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
