import { Injectable } from '@angular/core';
import { User } from './model/user';

const USER_KEY = 'USER_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser?:User;
  constructor() {
    if(sessionStorage.getItem(USER_KEY)){
      this.currentUser = JSON.parse(sessionStorage.getItem(USER_KEY)!);
    }
  }

  get isAuthenticated():boolean{
    return !!this.currentUser;
  }

  disconnect():void{
    this.currentUser = undefined;
    sessionStorage.clear()
  }

  authentUser(login:string, password:string):any{
    this.currentUser =  {
      id:1,
      login:login,
      lastname:'Doe',
      firstname: 'Jane'
    }
    sessionStorage.setItem(USER_KEY, JSON.stringify(this.currentUser));
    return this.currentUser;
  }
}
