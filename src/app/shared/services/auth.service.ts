import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User | null = null;
  constructor(
    private httpClient:HttpClient
  ) {
    // this.checkLogin().subscribe(res =>{
    //   if (res.success){
    //     this.user = res.user;
    //     // navigation to home, etc...
    //   }
    // });
  }

  login(user:User):Observable<{success:boolean, user:User, token:string}>{
    /* if backend requires form data instead of json,
        we need to convert user object to form data
    *   const userFormData = new HttpParams()
        .append('username',user.username)
        .append('password', user.password);
        the formData looks like this: username=bob&password=123
    * */

    return this.httpClient.post<{success:boolean, user:User, token:string}>(
      `${environment.api}/login`,
      user
    );
  }

  checkLogin():Observable<{success:boolean, user:object}>{
    /* for cookie/session based spring based server:
    * include a config object {withCredentials: true} in the req (add it to all reqs)
    * it will carry/set cookie for the req
    * */
    return this.httpClient.get<{success:boolean, user:object}>(`${environment.api}/checklogin`);
  }


  logout(){
    localStorage.removeItem('token');
    this.user = null;
  }
}
