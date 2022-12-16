import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../../services/landing-page.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {GetProductResponse} from "../../models/product";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  constructor(private landingPageService: LandingPageService,
              private route: Router,
              private location: Location) { }
  productDetail!: GetProductResponse;
  size: any;
  listSize: number[] = [];
  totalProduct = 1;
  ngOnInit(): void {
    this.landingPageService.idProduct$.subscribe(id => {
      if(id == ''){
        this.location.back();
        return;
      }
      this.landingPageService.getProduct(id).subscribe(res => {
          this.productDetail = res;
          res.listSizes.forEach(s => {
            let v:number = parseInt(s.name);
            this.listSize.push(v);
          })
        this.listSize.sort(function(a, b){return a - b});
          this.size = this.listSize[0].toString();
      });
    });
  }
  convertNumber(s: number) {
    let tmp = s.toString();
    return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  handClickSize(s: number) {
    this.size = s.toString();
  }

  handleTotalProduct(i: number) {
    if(i == 1){
      this.totalProduct += 1;
    }
    if(i == -1 && this.totalProduct > 1){
        this.totalProduct -= 1;
    }
  }
}
