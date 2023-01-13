import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "./services/landing-page.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private landingPageService: LandingPageService) { }
  totalProductInCart = 0;
  idUser = '';
  nameUser = '';
  ngOnInit(): void {
    this.landingPageService.cart$.subscribe(c => {
      this.totalProductInCart = c;
    } )
    this.landingPageService.idUser$.subscribe(id => {
      this.idUser = id;
      if(id != '') {
        this.landingPageService.getUser(id).subscribe(res => {
          this.nameUser = res.fullName;
        })
      }
    })
    this.checkLogInForCart();
  }

  checkLogInForCart(){
    if (this.idUser != ''){
      this.landingPageService.getUser(this.idUser).subscribe(res => {
        this.landingPageService._cartSubject.next(res.totalItemInCart);
      });
    }else {
      // @ts-ignore
      let data = JSON.parse(localStorage.getItem('cart')) || [];
      this.landingPageService._cartSubject.next(data.length);
    }
  }
}
