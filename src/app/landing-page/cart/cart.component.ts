import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor() { }
  listDataCart: any[] = [];
  totalPrice = 0;
  ngOnInit(): void {
    //@ts-ignore
    this.listDataCart = JSON.parse(localStorage.getItem('cart')) || [];
    this.calculatorTotal();
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
   if(number == 1){
     this.listDataCart[index].total += 1;
     localStorage.setItem('cart', JSON.stringify(this.listDataCart))
     this.calculatorTotal()
   }
   if(number == -1 && this.listDataCart[index].total - 1 > 0){
     this.listDataCart[index].total -= 1;
     localStorage.setItem('cart', JSON.stringify(this.listDataCart))
     this.calculatorTotal()
   }
  }
  calculatorTotal() {
    this.totalPrice = 0;
    this.listDataCart.forEach(c => {
      this.totalPrice += c.price * c.total;
    })
  }

  handleDelete(id: string) {
    if(confirm("Bạn có muốn xóa khỏi giỏ hàng không ?")) {
      let index = this.listDataCart.findIndex(c => c.id == id);
      this.listDataCart.splice(index,1)
      localStorage.setItem('cart', JSON.stringify(this.listDataCart))
      this.calculatorTotal()
    }
  }
}
