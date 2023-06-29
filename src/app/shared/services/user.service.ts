import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ProductsService} from "./products.service";
import {Product} from "../models/product";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient,
    private router:Router
  ) {
  }

  getCoursesByTeacherName(name: string){
    return this.httpClient.get<Product[]>(`${environment.api}/user/my-courses/${name}`);
  }
}
