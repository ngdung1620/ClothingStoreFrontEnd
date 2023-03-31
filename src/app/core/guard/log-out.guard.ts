import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LogOutGuard implements CanActivate {
  constructor(private cookieService: CookieService, private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') == ''|| localStorage.getItem('token') == null) {
      this.route.navigate(['']);
      return false;
    }
    return true;
  }

}
