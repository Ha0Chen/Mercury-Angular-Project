import {User} from "./user";

export interface AuthResponse{
  success:boolean,
  code:number,
  message:string,
  token:string,
  user:string,
  roles:string[]
}
