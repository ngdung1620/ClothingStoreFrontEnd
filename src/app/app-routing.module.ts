import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginGuard} from "./core/guard/login.guard";
import {NotFoundComponent} from "./core/component/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
  },
  {
    path: 'check-out',
    loadChildren: () => import('./check-out/check-out.module').then(m => m.CheckOutModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path:'**', component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
