import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainCheckOutComponent} from "./component/main-check-out/main-check-out.component";
import {StockProblemComponent} from "./component/stock-problem/stock-problem.component";
import {CheckOutSuccessComponent} from "./component/check-out-success/check-out-success.component";

const routes: Routes = [
  {path: '', component: MainCheckOutComponent},
  {path: 'stock_problem',component: StockProblemComponent},
  {
    path: 'check_out_success', component: CheckOutSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutRoutingModule { }
