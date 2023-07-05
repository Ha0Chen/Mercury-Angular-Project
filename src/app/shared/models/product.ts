import {Chapter} from "./chapter";

export interface Product{
  id:number;
  name:string;
  description:string;
  price:number;
  sales:number;
  image:string;
  teacherName:string;
  content:{id: number; data: string}[];
  commented:boolean;
}
