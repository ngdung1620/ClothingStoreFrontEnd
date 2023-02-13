import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "./services/landing-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private landingPageService: LandingPageService,
              private router: Router) { }
  totalProductInCart = 0;
  idUser = '';
  nameUser = '';
  visible =  false;
  isFormSearch = false;
  search = '';
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

  close() {
    this.visible = false;
  }

  handleClick() {
    this.visible = true;
  }

  handleClickMobile() {
    this.visible = false;
  }

  handleClickSearch() {
    this.isFormSearch = !this.isFormSearch;
  }

  handleClickInputSearch() {
    this.landingPageService._searchSubject.next(this.search);
    this.isFormSearch = false;
    this.router.navigate(['search']);
    this.search = '';
  }
}
