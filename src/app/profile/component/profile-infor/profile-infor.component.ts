import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../../../landing-page/services/landing-page.service";

@Component({
  selector: 'app-profile-infor',
  templateUrl: './profile-infor.component.html',
  styleUrls: ['./profile-infor.component.scss']
})
export class ProfileInforComponent implements OnInit {

  user = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: ''
  };
  constructor(private landingPageService: LandingPageService) { }

  ngOnInit(): void {
    this.landingPageService.idUser$.subscribe(idUser => {
      this.landingPageService.getUser(idUser).subscribe(res => {
        this.user = res;
      })
    })
  }

}
