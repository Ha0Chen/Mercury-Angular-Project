import {Product} from "./product";

export interface Order {
  userId: number,
  country: string,
  zipcode: number,
  paymentMethod: string,
  nameOnCard:string,
  cardNum: string,
  expiryDate: string,
  cvc: number,
  totalPrice:number,
  purchaseDate: Date,
  products: Product[]
}
