import { Component, OnInit } from '@angular/core';
import {CheckOutService} from "../../services/check-out.service";
import {Router} from "@angular/router";
import {GetOrderResponse} from "../../models/CheckOutModel";
import {Location} from "@angular/common";

@Component({
  selector: 'app-check-out-success',
  templateUrl: './check-out-success.component.html',
  styleUrls: ['./check-out-success.component.scss']
})
export class CheckOutSuccessComponent implements OnInit {
  dataSuccess!: GetOrderResponse;
  constructor(private orderService: CheckOutService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.orderService.idOrder$.subscribe(id => {
      if(id == ''){
        this.location.back();
        return;
      }else {
        this.orderService.getOrder(id).subscribe(res => {
          this.dataSuccess = res;
        })
      }

    })
  }
  convertNumber(s: any) {
    if(typeof s == "number") {
      let tmp = s.toString();
      return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return s;
  }

}
