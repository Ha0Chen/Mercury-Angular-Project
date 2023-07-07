import {User} from "./user";

export interface AuthResponse{
  roles: string[];
  success:boolean,
  code:number,
  message:string,
  token:string,
  user:string
}
