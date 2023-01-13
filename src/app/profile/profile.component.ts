import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

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
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {

  }
  handleLogOut() {
    this.cookieService.delete("token");
    location.reload();
  }
}
