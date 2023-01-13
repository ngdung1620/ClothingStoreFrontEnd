import { Component, OnInit } from '@angular/core';
import {CheckOutService} from "../../services/check-out.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {LandingPageService} from "../../../landing-page/services/landing-page.service";
import {GetProductResponse} from "../../../landing-page/models/product";

@Component({
  selector: 'app-stock-problem',
  templateUrl: './stock-problem.component.html',
  styleUrls: ['./stock-problem.component.scss']
})
export class StockProblemComponent implements OnInit {
  listDataProduct:GetProductResponse[] = [];
  constructor(private orderService: CheckOutService,
              private router: Router,
              private location: Location,
              private landingPageService: LandingPageService)
  {
    // @ts-ignore
    let listId:string[] = this.router.getCurrentNavigation().extras.state;
    listId.forEach(id => {
      this.landingPageService.getProduct(id).subscribe( res => {
        this.listDataProduct.push(res);
      })
    })

  }
  convertNumber(s: any) {
    if(typeof s == "number") {
      let tmp = s.toString();
      return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return s;
  }
  ngOnInit(): void {
    this.orderService.isOrderError$.subscribe( is => {
      if(is){

      }else {
        this.location.back();
      }
    })
  }

}
