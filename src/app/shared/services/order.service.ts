import {Injectable, OnInit} from "@angular/core";
import {Order} from "../models/order";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {Product} from "../models/product";
import {AuthService} from "./auth.service";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class OrderService{
  purchasedProducts : number[] | undefined = undefined;
  constructor(
    private httpClient: HttpClient,
    private auth: AuthService
  ) {
  }

  getOrdersByUserId(id:number):Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${environment.api}/orders/user/${id}`);
  }

  save(order:Order):Observable<Order>{
    return this.httpClient.post<Order>(`${environment.api}/orders`,order);
  }



}
