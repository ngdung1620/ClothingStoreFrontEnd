import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileInforComponent } from './component/profile-infor/profile-infor.component';
import { ProfileOrderComponent } from './component/profile-order/profile-order.component';
import {NzTableModule} from "ng-zorro-antd/table";
import { OrderDetailComponent } from './component/order-detail/order-detail.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInforComponent,
    ProfileOrderComponent,
    OrderDetailComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        NzTableModule
    ]
})
export class ProfileModule { }
