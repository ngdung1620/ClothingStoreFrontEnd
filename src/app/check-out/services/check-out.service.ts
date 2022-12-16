import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
   host = "https://provinces.open-api.vn/api/";
  constructor(private httpClient: HttpClient) { }
  getProvinces  = () => this.httpClient.get<any>(`${this.host}` + "?depth=1");
  getDistrict = (idCode: string) => this.httpClient.get<any>(`${this.host}` + "p/" + `${idCode}`+ "?depth=2");
  getWard = (idCode: string) => this.httpClient.get<any>(`${this.host}` + "d/" + `${idCode}` + "?depth=2");
}
