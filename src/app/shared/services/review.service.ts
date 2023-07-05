import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    private httpClient:HttpClient
  ) {
  }

  findReviewsByProductId(id:string):Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${environment.api}/reviews/product/${id}`);
  }
  findReviewsByUserId(id:string):Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${environment.api}/reviews/user/${id}`);
  }
  save(review:Review):Observable<Review>{
    return this.httpClient.post<Review>(`${environment.api}/reviews`, review);
  }
  // deleteByProductId(id:number):Observable<Response>

}
