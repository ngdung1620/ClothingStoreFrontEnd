import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../../services/landing-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ListDataOfSelling: any;
  ListDataOfNew: any;
  constructor(private landingPageService: LandingPageService,
              private route: Router) { }
  ngOnInit(): void {
    this.landingPageService.getSellingProduct().subscribe(res => {
      this.ListDataOfSelling = res;
    })
    this.landingPageService.getNewProduct().subscribe(res => {
      this.ListDataOfNew = res;
    })
  }
  clickProduct(id: string) {
    this.landingPageService._idProductSubject.next(id);
    this.route.navigate(['/detail-product']);
  }

}
