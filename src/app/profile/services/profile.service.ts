import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  _idOrderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  idOrder$: Observable<string> = this._idOrderSubject.asObservable();
  constructor(private httpClient: HttpClient) { }
  getListOrderById = (id: string) => this.httpClient.get<any>(`${environment.api_domain}/Order/get-lis-order-by-userId/${id}`)
}
