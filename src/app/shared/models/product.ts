import {Chapter} from "./chapter";

export interface Product{
  id:number;
  name:string;
  description:string;
  price:number;
  sales:number;
  image:string | File; // send a File to the backend
  teacherName:string;
  content:{id: number; data: string}[];
}
