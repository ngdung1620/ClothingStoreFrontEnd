import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest, RegisterResponse} from "../models/RegisterModel";
import {environment} from "../../../environments/environment";
import {LoginRequest, LoginResponse} from "../models/loginModel";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  registerAccount = (data: RegisterRequest) => this.httpClient.post<RegisterResponse>(`${environment.api_domain}/Authentication/registration`,data);
  logIn = (data: LoginRequest) => this.httpClient.post<LoginResponse>(`${environment.api_domain}/Authentication/login`,data)
}
