import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile.component";
import {ProfileInforComponent} from "./component/profile-infor/profile-infor.component";
import {ProfileOrderComponent} from "./component/profile-order/profile-order.component";
import {OrderDetailComponent} from "./component/order-detail/order-detail.component";

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      {path: '', component: ProfileInforComponent},
      {path: 'order', component: ProfileOrderComponent},
      {path: 'order_detail', component: OrderDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
