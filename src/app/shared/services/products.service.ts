import {Injectable} from "@angular/core";
import {Product} from "../models/product";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {Page} from "../models/page";
import {Chapter} from "../models/chapter";

@Injectable({
  providedIn:'root'
})
export class ProductsService {
  products:Product[] | undefined;

  constructor(
    private httpClient:HttpClient
  ) {
  }

  getProducts():Observable<Page>{
    return this.httpClient.get<Page>(`${environment.api}/courses`);
  }

  getProductsByPage(page:number, size:number, minPrice:number, maxPrice:number, minSales:number, maxSales:number, name:string, sortBy:number):Observable<Page>{
    return this.httpClient.get<Page>(
      `${environment.api}/courses?page=${page}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&minSales=${minSales}&maxSales=${maxSales}&name=${name}&sortType=${sortBy}`);
  }

  getProductById(id:string):Observable<Product>{
    return this.httpClient.get<Product>(`${environment.api}/courses/${id}`);
  }

  getProductDetailById(id: string):Observable<Chapter[]>{
    console.log(`${environment.api}/courses/content/${id}`);
    return this.httpClient.get<Chapter[]>(`${environment.api}/courses/content/${id}`);
  }

}
