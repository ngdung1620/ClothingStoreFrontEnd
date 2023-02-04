import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../../../landing-page/services/landing-page.service";
import {ProfileService} from "../../services/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-order',
  templateUrl: './profile-order.component.html',
  styleUrls: ['./profile-order.component.scss']
})
export class ProfileOrderComponent implements OnInit {
  listOfData: any;
  constructor(private landingPageService: LandingPageService,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit(): void {
    this.landingPageService.idUser$.subscribe(idUser => {
      this.profileService.getListOrderById(idUser).subscribe( res => {
        this.listOfData = res;
      })
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
    let result = '';
    switch (s) {
      case 1:
        result = "Chờ xửa lí"
        break;
      case 2:
        result = "Chờ giao hàng"
        break;
      case 3:
        result = "Đang giao"
        break;
      case 4:
        result = "Hoàn thành"
        break;
      case -1:
        result = "Đã huỷ"
        break;
    }
    return result;
  }

  handleClick(orderId: any) {
    this.profileService._idOrderSubject.next(orderId);
    this.router.navigate(['profile/order_detail'])
  }
}
