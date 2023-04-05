import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../../services/landing-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  listData:any = [];
  search = '';
  isMessage = false;
  inputSearch = '';
  constructor(private landingPageService: LandingPageService,
              private route: Router) { }

  ngOnInit(): void {
   this.landingPageService.search$.subscribe(res => {
     this.search = res;
     if(res != ''){
       this.landingPageService.searchProduct({search:res}).subscribe(res => {
         this.listData = res;
         if(res.length == 0){
           this.isMessage = true;
         }else {
           this.isMessage = false;
         }
       })
     }
   })
  }
  convertNumber(s: number) {
    let tmp = s.toString();
    return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  clickProduct(id: string) {
    this.landingPageService._idProductSubject.next(id);
    this.route.navigate(['/detail-product']);
  }

  handleClickSearch() {
    this.isMessage = false;
    this.landingPageService.searchProduct({search: this.inputSearch}).subscribe(res => {
      this.listData = res;
      if(res.length == 0){
        this.isMessage = true;
      }
    })
  }
}
