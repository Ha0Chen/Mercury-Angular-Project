import {Product} from "./product";

export interface Order {
  username:string,
  country: string,
  zipcode: number,
  paymentMethod: string,
  nameOnCard:string,
  cardNum: string,
  expiryDate: string,
  cvc: number,
  products: Product[]
}
