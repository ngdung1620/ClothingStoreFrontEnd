import { Component, OnInit } from '@angular/core';
import {ListProductRequest, ListProductResponse} from "../../models/product";
import {HttpClient} from "@angular/common/http";
import {LandingPageService} from "../../services/landing-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ListOfData: any;
  constructor(private landingPageService: LandingPageService,
              private route: Router) { }
  ngOnInit(): void {
    const data: ListProductRequest = {
      search: '',
      pageIndex: 1,
      pageSize: 10
    }
    this.landingPageService.listProduct(data).subscribe(res => {
      this.ListOfData = res.products;
    })
  }
  clickProduct(id: string) {
    this.landingPageService._idProductSubject.next(id);
    this.route.navigate(['/detail-product']);
  }

}
