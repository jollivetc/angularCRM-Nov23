import { Injectable } from '@angular/core';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const USER_KEY = 'USER_KEY';
const TOKEN_KEY = 'TOKEN_KEY'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?:User;
  private token?: string;
  constructor(private http:HttpClient) {
    if(sessionStorage.getItem(USER_KEY)){
      this.currentUser = JSON.parse(sessionStorage.getItem(USER_KEY)!);
      this.token = sessionStorage.getItem(TOKEN_KEY)!
    }
  }

  get isAuthenticated():boolean{
    return !!this.currentUser;
  }

  get jwtToken():string|undefined{
    return this.token;
  }

  disconnect():void{
    this.currentUser = undefined;
    this.token = undefined;
    sessionStorage.clear()
  }

  authentUser(login:string, password:string):Observable<User>{
    return this.http.post<AuthentResponse>('/api/auth/login', {email:login, password:password}).pipe(
      map((response:AuthentResponse)=>{
        this.currentUser = response.user;
        this.token = response.token;
        sessionStorage.setItem(USER_KEY, JSON.stringify(this.currentUser));
        sessionStorage.setItem(TOKEN_KEY, this.token);
        return this.currentUser;
      })
    )
  }
}

interface AuthentResponse {
  user: User,
  token: string
}
