import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login/services/login.service";
import {CookieService} from "ngx-cookie-service";
import {LandingPageService} from "./landing-page/services/landing-page.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private loginService: LoginService,
              private cookieService: CookieService,
              private landingPageService: LandingPageService) {
  }
  title = 'ClothingStore';

  ngOnInit(): void {
    if(localStorage.getItem('token') != null && localStorage.getItem('token') != ''){
      const tokenObj = this.loginService.token();
      this.landingPageService._idUserSubject.next(tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
      this.landingPageService.idUser$.subscribe(id => {
        this.landingPageService.getUser(id).subscribe( res => {
          this.landingPageService._idCartSubject.next(res.cartId);
          this.landingPageService._cartSubject.next(res.totalItemInCart);
        })
      })
    }
  }

}
