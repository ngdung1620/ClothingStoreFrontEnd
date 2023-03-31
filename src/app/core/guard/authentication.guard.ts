import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,
              private route: Router,
              private cookieService: CookieService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') == null) {
      this.route.navigate(["/login"]);
      return false;
    }

    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token)) {
      this.route.navigate(["/login"]);
      return false;
    }
    return true;
  }

}
