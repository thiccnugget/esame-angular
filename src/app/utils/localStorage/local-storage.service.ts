import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageKey = 'userData';

  constructor() { }

  ngOnInit() {
    console.log(this.localStorageKey);
  }

  saveUserData(username: string, email: string, password: string): void{
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {username, email, hashedPassword};
    const userJson = JSON.stringify(data);
    localStorage.setItem(this.localStorageKey, userJson);
  }

  

  getUserData():  { username: string, email: string, hashedPassword: string } | null {    
    const userJson = localStorage.getItem(this.localStorageKey);
    if (userJson){
      const data = JSON.parse(userJson);
      return data;
    }
    return null;
  }

  clearUserData(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}
