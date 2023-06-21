import {Injectable} from "@angular/core";
import {Product} from "../models/product";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {Page} from "../models/page";

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

  getProductsByPage(page:number, size:number ):Observable<Page>{
    return this.httpClient.get<Page>(`${environment.api}/courses?page=${page}&size=${size}`);
  }
}