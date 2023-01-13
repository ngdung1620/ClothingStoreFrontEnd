import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import { MainCheckOutComponent } from './component/main-check-out/main-check-out.component';
import { StockProblemComponent } from './component/stock-problem/stock-problem.component';
import { CheckOutSuccessComponent } from './component/check-out-success/check-out-success.component';
import {NzNotificationModule} from "ng-zorro-antd/notification";


@NgModule({
  declarations: [
    CheckOutComponent,
    MainCheckOutComponent,
    StockProblemComponent,
    CheckOutSuccessComponent
  ],
  imports: [
    CommonModule,
    CheckOutRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzNotificationModule
  ]
})
export class CheckOutModule { }
