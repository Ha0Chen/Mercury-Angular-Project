import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {User} from "../models/user";
import {AuthResponse} from "../models/AuthResponse";
import {Router} from "@angular/router";
import {ProductsService} from "./products.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User | null = null;
  roles: string[] = [];
  constructor(
    private httpClient:HttpClient,
    private router:Router,
    private ps:ProductsService
  ) {
    if (localStorage.getItem("token")){
      this.checkLogin().subscribe(res =>{
        console.log(res);
        this.user = JSON.parse(res.user);
        this.roles = res.roles;
      });
    }

  }

  login(user:User):Observable<AuthResponse>{
    /* if backend requires form data instead of json,
        we need to convert user object to form data
    *   const userFormData = new HttpParams()
        .append('username',user.username)
        .append('password', user.password);
        the formData looks like this: username=bob&password=123
    * */

    return this.httpClient.post<AuthResponse>(
      `${environment.api}/auth/login`,
      user
    );
  }

  checkLogin():Observable<AuthResponse>{
    /* for cookie/session based spring based server:
    * include a config object {withCredentials: true} in the req (add it to all reqs)
    * it will carry/set cookie for the req
    * */
    return this.httpClient.get<AuthResponse>(`${environment.api}/auth/checklogin`);
  }


  logout(){
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/courses']).catch();
    this.ps.clearCart();
  }


  register(body:{username:string, password:string, teacher:boolean}):Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${environment.api}/auth/register`, body);
  }


}
