import {Injectable} from "@angular/core";
import {Product} from "../models/product";
import {HttpClient, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {Page} from "../models/page";
import {Chapter} from "../models/chapter";

@Injectable({
  providedIn:'root'
})
export class ProductsService {
  products:Product[] | undefined;
  cart:Product[] = [];
  totalPriceInCart:number = 0;
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
    return this.httpClient.get<Chapter[]>(`${environment.api}/courses/content/${id}`);
  }

  updateProduct(product: Product):Observable<Product>{
    return this.httpClient.put<Product>(`${environment.api}/courses`, product);
  }

  addProduct(formData:FormData):Observable<Product>{
    return this.httpClient.post<Product>(`${environment.api}/courses`,formData);
  }

  deleteProduct(id:number):Observable<Response>{
    return this.httpClient.delete<Response>(`${environment.api}/courses/${id}`);
  }


  saveCart(){
    sessionStorage.setItem('cart-items', JSON.stringify(this.cart));
  }

  addToCart(addedProduct: Product){
    this.cart?.push(addedProduct);
    this.saveCart();
    this.totalPriceInCart += addedProduct.price;
  }

  loadCart(){
    this.cart = JSON.parse(sessionStorage.getItem('cart-items') as any) || [];
    let total:number = 0;
    this.cart.forEach(item => {
      total += item.price;
    });
    this.totalPriceInCart = total;
  }

  productInCart(product: Product){
    return this.cart.findIndex((item) => item.id === product.id) > -1;
  }

  removeProduct(product: Product){
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index > - 1){
      this.cart.splice(index, 1);
      this.saveCart();
      this.totalPriceInCart -= product.price;
    }
  }

  clearCart(){
    sessionStorage.removeItem('cart-items');
    this.loadCart();
    this.totalPriceInCart = 0;
  }

  getCoursesByTeacherName(name: string){
    return this.httpClient.get<Product[]>(`${environment.api}/courses/teachername/${name}`);
  }




}
