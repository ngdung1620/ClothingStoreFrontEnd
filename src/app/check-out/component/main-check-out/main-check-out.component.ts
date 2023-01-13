import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemInCart, ItemOrders, OrderDontHaveAccountRequest, OrderHaveAccountRequest} from "../../models/CheckOutModel";
import {CheckOutService} from "../../services/check-out.service";
import {Router} from "@angular/router";
import {LandingPageService} from "../../../landing-page/services/landing-page.service";
import {CartService} from "../../../landing-page/services/cart.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-main-check-out',
  templateUrl: './main-check-out.component.html',
  styleUrls: ['./main-check-out.component.scss']
})
export class MainCheckOutComponent implements OnInit {

  formData!: FormGroup;
  listDataProvince!: any;
  listDataDistrict!: any;
  listDataWard!: any;
  listDataItem: ItemInCart[] = [];
  temporaryPrice = 0;
  transPrice = 0;
  constructor(private fb: FormBuilder,
              private checkOutService: CheckOutService,
              private router: Router,
              private landingPageService: LandingPageService,
              private cartService: CartService,
              private orderService: CheckOutService,
              private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      fullName: [null,[Validators.required]],
      phoneNumber: [null,[Validators.required,this.numberValidator]],
      province:[null,[Validators.required]],
      district:[null,[Validators.required]],
      ward: [null,[Validators.required]],
      address: [null,[Validators.required]],
    })
    this.checkOutService.getProvinces().subscribe(res => {
      this.listDataProvince = res;
    })
    this.checkLogIn();
    this.checkCart()
  }
  checkCart(){
    this.landingPageService.idUser$.subscribe(idUser => {
      if(idUser == ''){
        //@ts-ignore
        let data = JSON.parse(localStorage.getItem('cart')) || [];
        if (data.length <= 0){
          this.router.navigateByUrl('/cart')
        }
      }else {
        this.landingPageService.cart$.subscribe(c => {
          if (c <= 0){
            this.router.navigateByUrl('/cart')
          }
        })
      }
    })

  }
  checkLogIn(){
    this.landingPageService.idUser$.subscribe( idUser => {
      if(idUser != ''){
        this.landingPageService.idCart$.subscribe(idCart => {
          this.cartService.getCart(idCart).subscribe(res =>{
            this.listDataItem = res;
            this.listDataItem.forEach(d => {
              this.temporaryPrice += d.price;
            })
          })
        })
        this.handleCalculatorTransPrice();
      }else {
        //@ts-ignore
        let data = JSON.parse(localStorage.getItem('cart')) || [];
        data.forEach((d:any) => {
          this.landingPageService.getProduct(d.idProduct).subscribe(res => {
            let item: { img: string; quantity: any; productId: any; size: any; price: number; name: string };
            item = {
              quantity: d.quantity,
              productId: d.idProduct,
              price: res.price,
              name: res.name,
              img: res.img,
              size: d.size
            };
            this.temporaryPrice += res.price;
            this.listDataItem.push(<ItemInCart>item);
          });
        })
        this.handleCalculatorTransPrice();
      }
    })
  }
  handleCalculatorTransPrice(){
    this.transPrice = this.temporaryPrice < 1500000? 40000: 0;
  }
  numberValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!control.value.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
      return { invalidNumber: true, error: true };
    }
    return {};
  };
  convertNumber(s: any) {
    if(typeof s == "number") {
      let tmp = s.toString();
      return tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return s;
  }
  submitForm(): void {
    if (this.formData.valid) {
      let province = this.listDataProvince.find((p:any) => p.code == this.formData.value.province);
      let district = this.listDataDistrict.find((p:any) => p.code == this.formData.value.district);
      let ward = this.listDataWard.find((p:any) => p.code == this.formData.value.ward);
      this.landingPageService.idUser$.subscribe(idUser => {
        if(idUser != ''){
          this.landingPageService.idCart$.subscribe(idCart => {
            const data: OrderHaveAccountRequest = {
              cartId: idCart,
              totalPrice: this.temporaryPrice + this.transPrice,
              shippingFee: this.transPrice,
              customerName: this.formData.value.fullName,
              phoneNumber: this.formData.value.phoneNumber,
              address: this.formData.value.address + ',' + ward.name + ',' + district.name + ',' + province.name,
              userId: idUser
            }
            this.orderService.checkOutHaveAccount(data).subscribe(res => {
              if(res.status == -1){
                this.orderService._isOrderErrorSubject.next(true);
                this.router.navigateByUrl('check-out/stock_problem',{state:[...res.productError]})
              }
              if(res.status == 1){
                this.orderService._idOrderSubject.next(res.orderId);
                this.router.navigate(['check-out/check_out_success'])
              }if(res.status == -2){
                this.notification.error("Thất bại","Không tìm thấy sản phẩm")
              }
            })
          })
        }
        else {
          //@ts-ignore
          let dataLocal = JSON.parse(localStorage.getItem('cart')) || [];
          let itemOrders:ItemOrders[] = [];
          dataLocal.forEach((i:any) => {
            const item:ItemOrders = {
              productId: i.idProduct,
              quantity: i.quantity,
              size: i.size
            }
            itemOrders.push(item);
          })
          const data: OrderDontHaveAccountRequest = {
            itemOrders: itemOrders,
            totalPrice: this.temporaryPrice + this.transPrice,
            shippingFee: this.transPrice,
            CustomerName: this.formData.value.fullName,
            phoneNumber: this.formData.value.phoneNumber,
            address: this.formData.value.address + ',' + ward.name + ',' + district.name + ',' + province.name
          }
          this.orderService.checkOutDontHaveAccount(data).subscribe(res => {
            if(res.status == -1){
              this.orderService._isOrderErrorSubject.next(true);
              this.router.navigateByUrl('check-out/stock_problem',{state:[...res.productError]})
            }
            if(res.status == 1){
              this.orderService._idOrderSubject.next(res.orderId);
              localStorage.removeItem('cart');
              this.router.navigate(['check-out/check_out_success'])
            }if(res.status == -2){
              this.notification.error("Thất bại","Không tìm thấy sản phẩm")
            }
          })
        }
      })

    } else {
      Object.values(this.formData.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleChangeProvince(e: any) {
    this.checkOutService.getDistrict(e).subscribe( res => {
      this.listDataDistrict = res.districts;
    })
    this.formData.controls['district'].setValue('');
    this.formData.controls['ward'].setValue('');
  }

  handleChangeDistrict(e: any) {
    this.checkOutService.getWard(e).subscribe(res => {
      this.listDataWard = res.wards;
    })
    this.formData.controls['ward'].setValue('');
  }

}
