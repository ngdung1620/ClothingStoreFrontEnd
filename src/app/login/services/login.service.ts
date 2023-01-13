import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest, RegisterResponse} from "../models/RegisterModel";
import {environment} from "../../../environments/environment";
import {LoginRequest, LoginResponse} from "../models/loginModel";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private jwtHelperService: JwtHelperService,
              private cookieService: CookieService) { }
  registerAccount = (data: RegisterRequest) => this.httpClient.post<RegisterResponse>(`${environment.api_domain}/Authentication/registration`,data);
  logIn = (data: LoginRequest) => this.httpClient.post<LoginResponse>(`${environment.api_domain}/Authentication/login`,data);
  public token = () => {
    if(this.cookieService.get('token') == '' || this.cookieService.get('token') == null){
      return;
    }
    const token = this.cookieService.get('token');
    return this.decodeToken(token);
  }

  public decodeToken = (rawToken: string) => this.jwtHelperService?.decodeToken(rawToken);
}
