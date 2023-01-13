import { Component, OnInit } from '@angular/core';
import {LandingPageService} from "../services/landing-page.service";
import {CartService} from "../services/cart.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private landingPageService: LandingPageService,
              private cartService: CartService,
              private notification: NzNotificationService,
  ) { }
  listDataCart: any[] = [];
  totalPrice = 0;
  ngOnInit(): void {
    this.checkLoginCart();
  }
  checkLoginCart(){
    this.landingPageService.idUser$.subscribe(id => {
      if(id == ''){
        //@ts-ignore
        this.listDataCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.calculatorTotal();
      }else {
        this.getListCart(id);
      }
    })
  }
  getListCart(id: string){
    this.landingPageService.getUser(id).subscribe(res =>{
      this.cartService.getCart(res.cartId).subscribe(res => {
        this.listDataCart = res;
        this.calculatorTotal();
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
  handleAdjust(number: number, id: string) {
    let index =  this.listDataCart.findIndex(c => c.id == id);
    this.landingPageService.idUser$.subscribe( idUser => {
      if(idUser != ''){
        if(number == 1){
          const data: any = {
            id: id,
            quantity: this.listDataCart[index].quantity + 1
          }
          this.cartService.editProductCart(data).subscribe( res => {
            if(res.status == -1){
              this.notification.error('Thất bại',res.message);
            }else {
              this.getListCart(idUser);
            }
          })
        }
        if(number == -1 && this.listDataCart[index].quantity - 1 > 0){
          const data: any = {
            id: id,
            quantity: this.listDataCart[index].quantity - 1
          }
          this.cartService.editProductCart(data).subscribe( res => {
            if(res.status == -1){
              this.notification.error('Thất bại',res.message);
            }else {
              this.getListCart(idUser);
            }
          })
        }
      }else {
        if(number == 1){
          this.listDataCart[index].quantity += 1;
          localStorage.setItem('cart', JSON.stringify(this.listDataCart))
          this.calculatorTotal()
        }
        if(number == -1 && this.listDataCart[index].quantity - 1 > 0){
          this.listDataCart[index].quantity -= 1;
          localStorage.setItem('cart', JSON.stringify(this.listDataCart))
          this.calculatorTotal()
        }
      }
    })
  }
  calculatorTotal() {
    this.totalPrice = 0;
    this.listDataCart.forEach(c => {
      this.totalPrice += c.price * c.quantity;
    })
  }
  calculatorTotalItem() {
    this.landingPageService._cartSubject.next(this.listDataCart.length);
}
  handleDelete(id: string) {
    if(confirm("Bạn có muốn xóa khỏi giỏ hàng không ?")) {
      this.landingPageService.idUser$.subscribe( idUser => {
        if(idUser != ''){
          this.cartService.deleteProductInCart(id).subscribe(res => {
            if(res){
              this.notification.success("Thành công", "Xoá thành công");
            }
            this.landingPageService.getUser(idUser).subscribe(res =>{
              this.cartService.getCart(res.cartId).subscribe(res => {
                this.listDataCart = res;
                this.calculatorTotal();
                this.calculatorTotalItem();
              })
            })
          })
        }else {
          let index = this.listDataCart.findIndex(c => c.id == id);
          this.listDataCart.splice(index,1)
          localStorage.setItem('cart', JSON.stringify(this.listDataCart))
          this.notification.success("Thành công", "Xoá thành công");
          this.calculatorTotal()
          this.calculatorTotalItem();
        }
      })
    }
  }

}
