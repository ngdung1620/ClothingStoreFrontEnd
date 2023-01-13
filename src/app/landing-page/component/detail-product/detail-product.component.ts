import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../../services/landing-page.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {GetProductResponse} from "../../models/product";
import {AddProductInCartRequest, CartLocal} from "../../models/cart";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  constructor(private landingPageService: LandingPageService,
              private route: Router,
              private location: Location,
              private notification: NzNotificationService,
              private  cartService: CartService) { }
  productDetail = new GetProductResponse();
  size: any;
  listSize: number[] = [];
  totalProduct = 1;
  cart: CartLocal[] = [];
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
  convertNumber(s: any) {
    if(typeof s == "number") {
      let tmp = s.toString();
      return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return s;
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

  handleAddCart() {
    this.landingPageService.idUser$.subscribe(id => {
      let idCart = '';
       this.landingPageService.idCart$.subscribe( id => {
         idCart = id;
       })
      if(id != ''){
        const data: AddProductInCartRequest = {
          cartId: idCart,
          productId: this.productDetail.id,
          quantity: this.totalProduct,
          size: this.size
        }
       this.cartService.addProductInCart(data).subscribe( res => {
         if(res.status == -1){
           this.notification.error('Thất bại',res.message);
         }else {
           this.cartService.getCart(idCart).subscribe(res => {
             this.landingPageService._cartSubject.next(res.length)
           })
           this.notification.success("Thành công",res.message);
         }
       })

      }
      else {
        // @ts-ignore
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        let isCheck = false;
        if(this.totalProduct > this.productDetail.total){
          this.notification.error("Thất bại", "Số lượng sản phẩm không đủ !")
          return;
        }
        this.cart.forEach( c => {
          if(c.idProduct == this.productDetail.id && c.size == this.size){
            c.quantity += this.totalProduct;
            isCheck = true;
          }
        })
        if(!isCheck){
          this.cart.push({
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            idProduct: this.productDetail.id,
            size: this.size,
            quantity: this.totalProduct,
            name: this.productDetail.name,
            price: this.productDetail.price,
            img: this.productDetail.img
          })
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
        this.landingPageService._cartSubject.next(this.cart.length)
        this.notification.success("Thành công","Thêm vào giỏ hàng thành công");
      }
    })

  }
}
