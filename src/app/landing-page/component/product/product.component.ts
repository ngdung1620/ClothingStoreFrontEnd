import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../../services/landing-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  isToggle = true
  title = '';
  listData: any;
  listDataOfGroupCategory: any;
  isAction = ''
  isEmpty =  false;
  visible = false;
  constructor(private landingPageService: LandingPageService,
              private route: Router) { }

  ngOnInit(): void {
    this.title = 'Tất cả sản phẩm';
    this.getProduct();
    this.getGroupCategory();
  }
  getProduct () {
    this.landingPageService.getAllProduct().subscribe((res: any) => {
      this.listData = res;
      if(res.length == 0){
        this.isEmpty = true;
      }else {
        this.isEmpty = false;
      }
    })
  }
  getGroupCategory () {
    this.landingPageService.getGroupCategory().subscribe(res  => {
      this.listDataOfGroupCategory = res;
    })
  }
  handleOpen() {
    this.isToggle = !this.isToggle;
  }

  convertNumber(s: number) {
    let tmp = s.toString();
    return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  handleClick(d: any) {
    this.isAction = d.name;
    this.title = d.name;
    this.landingPageService.getCategory(d.id).subscribe(res => {
      this.listData = res.products;
      if(res.products.length == 0){
        this.isEmpty = true;
      }else {
        this.isEmpty = false;
      }

    })
    this.visible = false;

  }

  clickProduct(id: string) {
    this.landingPageService._idProductSubject.next(id);
    this.route.navigate(['/detail-product']);
  }

  close() {
    this.visible = false;
  }

  handleClickCategory() {
    this.visible = true;
  }

  handleClickTitle() {
    this.getProduct();
    this.title = 'Tất cả sản phẩm';
    this.isAction = '';
    this.visible = false;
  }
}
