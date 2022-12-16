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
  ngOnInit(): void {
    this.landingPageService.cart$.subscribe(c => {
      this.totalProductInCart = c;
    } )
    // @ts-ignore
    let data = JSON.parse(localStorage.getItem('cart')) || [];
    this.landingPageService._cartSubject.next(data.length);
  }

}
