export interface Review{
  id:number,
  userId:number;
  userName:string;
  productId:number;
  productName:string;
  date: Date;
  content: string;
  rating: number;
  orderId:number
}
