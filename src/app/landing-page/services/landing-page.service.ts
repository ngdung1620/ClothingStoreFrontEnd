import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  GetCategoryResponse,
  GetProductResponse,
  GroupCategoryResponse,
  ListProductRequest, ListProductResponse,
  ProductResponse
} from "../models/product";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private httpClient: HttpClient) { }
  _idProductSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idProduct$: Observable<string> = this._idProductSubject.asObservable();
  getAllProduct():Observable<ProductResponse[]>{
    return this.httpClient.get<ProductResponse[]>(`${environment.api_domain}/Product/get-all-product`).pipe(
    )
  }
  getGroupCategory = () => this.httpClient.get<GroupCategoryResponse[]>(`${environment.api_domain}/GroupCategory/get-list-group-category`);
  getCategory = (id: string) => this.httpClient.get<GetCategoryResponse>(`${environment.api_domain}/Category/get-category/${id}`);
  getProduct = (id: string) => this.httpClient.get<GetProductResponse>(`${environment.api_domain}/Product/get-product/${id}`);
  listProduct = (data: ListProductRequest) => this.httpClient.post<ListProductResponse>(`${environment.api_domain}/Product/get-list-product`,data);
}
