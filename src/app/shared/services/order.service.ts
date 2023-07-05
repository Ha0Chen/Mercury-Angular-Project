import {Injectable} from "@angular/core";
import {Order} from "../models/order";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class OrderService{

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getOrdersByUserId(id:number):Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${environment.api}/orders/user/${id}`);
  }

  save(order:Order):Observable<Order>{
    return this.httpClient.post<Order>(`${environment.api}/orders`,order);
  }
}
