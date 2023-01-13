import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  GetOrderResponse,
  OrderDontHaveAccountRequest,
  OrderHaveAccountRequest,
  OrderResponse
} from "../models/CheckOutModel";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  _isOrderErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isOrderError$:Observable<boolean> = this._isOrderErrorSubject.asObservable();
  _idOrderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idOrder$: Observable<string> = this._idOrderSubject.asObservable();
   host = "https://provinces.open-api.vn/api/";
  constructor(private httpClient: HttpClient) { }
  getProvinces  = () => this.httpClient.get<any>(`${this.host}` + "?depth=1");
  getDistrict = (idCode: string) => this.httpClient.get<any>(`${this.host}` + "p/" + `${idCode}`+ "?depth=2");
  getWard = (idCode: string) => this.httpClient.get<any>(`${this.host}` + "d/" + `${idCode}` + "?depth=2");
  checkOutHaveAccount = (data: OrderHaveAccountRequest) =>
    this.httpClient.post<OrderResponse>(`${environment.api_domain}/Order/checkout-have-account`,data);
  checkOutDontHaveAccount = (data: OrderDontHaveAccountRequest) =>
    this.httpClient.post<OrderResponse>(`${environment.api_domain}/Order/checkout-dont-have-account`,data);
  getOrder = (id: string) => this.httpClient.get<GetOrderResponse>(`${environment.api_domain}/Order/get-order/${id}`);
}
