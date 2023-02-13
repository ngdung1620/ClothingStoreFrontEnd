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
import {UserResponse} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private httpClient: HttpClient) { }
  _idProductSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idProduct$: Observable<string> = this._idProductSubject.asObservable();
  _idUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idUser$: Observable<string> = this._idUserSubject.asObservable();
  _idCartSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idCart$: Observable<string> = this._idCartSubject.asObservable();
  _cartSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cart$: Observable<number> = this._cartSubject.asObservable();

  _searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  search$: Observable<string> = this._searchSubject.asObservable();
  getAllProduct():Observable<ProductResponse[]>{
    return this.httpClient.get<ProductResponse[]>(`${environment.api_domain}/Product/get-all-product`).pipe(
    )
  }
  getGroupCategory = () => this.httpClient.get<GroupCategoryResponse[]>(`${environment.api_domain}/GroupCategory/get-list-group-category`);
  getCategory = (id: string) => this.httpClient.get<GetCategoryResponse>(`${environment.api_domain}/Category/get-category/${id}`);
  getProduct = (id: string) => this.httpClient.get<GetProductResponse>(`${environment.api_domain}/Product/get-product/${id}`);
  listProduct = (data: ListProductRequest) => this.httpClient.post<ListProductResponse>(`${environment.api_domain}/Product/get-list-product`,data);
  getUser = (id: string) => this.httpClient.get<UserResponse>(`${environment.api_domain}/Authentication/get-user/${id}`);
  getSellingProduct = () => this.httpClient.get<ProductResponse[]>(`${environment.api_domain}/Product/get-selling-product`);
  getNewProduct = () => this.httpClient.get<ProductResponse[]>(`${environment.api_domain}/Product/get-new-product`);
  searchProduct = (data:{search: string}) => this.httpClient.post<ProductResponse[]>(`${environment.api_domain}/Product/search-product`,data)
}
