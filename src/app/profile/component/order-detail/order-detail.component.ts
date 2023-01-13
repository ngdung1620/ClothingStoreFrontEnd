import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {CheckOutService} from "../../../check-out/services/check-out.service";
import {GetOrderResponse} from "../../../check-out/models/CheckOutModel";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  dataOrder: GetOrderResponse = {
    orderId : '',
    orderDate : new Date(),
    status : 0,
    totalPrice : 0,
    shippingFee : 0,
    customerName : '',
    phoneNumber : '',
    address : '',
    productOrders: []
  };
  temporaryPrice = 0;
  constructor(private profileService: ProfileService,
              private orderService: CheckOutService) { }

  ngOnInit(): void {
    this.profileService.idOrder$.subscribe(idOrder => {
      if(idOrder == ''){
        history.back();
      }
      else {
        this.orderService.getOrder(idOrder).subscribe(res => {
          this.dataOrder = res;
          res.productOrders.forEach(p => {
            this.temporaryPrice += p.price * p.quantity
          })
        })
      }
    })
  }
  handleData(orderDate: string){
    let d = new Date(orderDate);
    const date = d.toISOString().split('T')[0].split("-").reverse().join("-");
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
  }
  convertNumber(s: any) {
    if(typeof s == "number") {
      let tmp = s.toString();
      return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return s;
  }
  handleStatus(s: number){
    if(s == 1){
      return "Chờ xử lí"
    }else if (s == 2){
      return "Chờ thanh toán"
    }else if(s == 3){
      return "Đã hoàn thành"
    }else {
      return "Đã huỷ"
    }
  }
}
