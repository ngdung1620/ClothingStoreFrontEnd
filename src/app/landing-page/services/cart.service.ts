import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AddProductInCartRequest, AddProductInCartResponse} from "../models/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  getCart = (id: string) => this.httpClient.get<any>(`${environment.api_domain}/Cart/get-cart/${id}`);
  editProductCart =(data: any) => this.httpClient.post<any>(`${environment.api_domain}/Cart/edit-product-cart`,data);
  addProductInCart = (data: AddProductInCartRequest) => this.httpClient.post<AddProductInCartResponse>(`${environment.api_domain}/Cart/add-product-cart`,data);
  deleteProductInCart = (id: string) => this.httpClient.delete(`${environment.api_domain}/Cart/delete-product-cart/${id}`)
}
