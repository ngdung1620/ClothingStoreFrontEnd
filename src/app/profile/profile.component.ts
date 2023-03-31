import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {LandingPageService} from "../landing-page/services/landing-page.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  listOption = [
    {
      id: 1,
      link:'/profile',
      exact: {
        exact: true,
      },
      icon:'fa-solid fa-user item-icon',
      title: 'Thông tin'
    },
    {
      id: 2,
      link:'order',
      exact: {
        exact: false,
      },
      icon:'fa-solid fa-clipboard-list',
      title: 'Danh sách đơn hàng'
    }

  ]
  user = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: ''
  };
  constructor(private cookieService: CookieService,
              private landingPageService: LandingPageService) { }

  ngOnInit(): void {
    this.landingPageService.idUser$.subscribe(idUser => {
      this.landingPageService.getUser(idUser).subscribe(res => {
        this.user = res;
      })
    })
  }
  handleLogOut() {
   localStorage.removeItem('token')
    location.reload();
  }
}
