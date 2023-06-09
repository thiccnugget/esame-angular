import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageKey = 'userData';

  constructor() { }

  saveUserData(username: string, email: string, password: string): void{
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {username, email, password: hashedPassword};
    const userJson = JSON.stringify(data);
    localStorage.setItem(this.localStorageKey, userJson);
  }

  getUserData():  { username: string, email: string, password: string } | null {    
    const userJson = localStorage.getItem(this.localStorageKey);
    if (userJson){
      const data = JSON.parse(userJson);
      data.password =  bcrypt.hashSync(data.password, 10 );
      return data;
    }
    return null;
  }

  clearUserData(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}
