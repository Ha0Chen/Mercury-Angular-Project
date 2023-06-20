import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {User} from "../models/user";
import {AuthResponse} from "../models/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User | null = null;
  constructor(
    private httpClient:HttpClient
  ) {
    if (localStorage.getItem("token")){
      this.checkLogin().subscribe(res =>{
        this.user = res;
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

  checkLogin():Observable<User>{
    /* for cookie/session based spring based server:
    * include a config object {withCredentials: true} in the req (add it to all reqs)
    * it will carry/set cookie for the req
    * */
    return this.httpClient.get<User>(`${environment.api}/auth/checklogin`);
  }


  logout(){
    localStorage.removeItem('token');
    this.user = null;
  }
}
