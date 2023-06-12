import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { Cart } from '../../utils/types';

@Injectable({
  providedIn: 'root'
})



export class LocalStorageService {
  private localStorageKey = 'userData';

  constructor() { }

  saveUserData(username: string, email: string, password: string): void{
    const hashedPassword = bcrypt.hashSync(password, 10);
    const cart : Cart[] = [];
    const data = {username, email, hashedPassword, cart};
    const userJson = JSON.stringify(data);
    localStorage.setItem(this.localStorageKey, userJson);
    
  }

  //sistemare la logica (funonzia btw)
  addToCart(product: Cart): boolean {
    let userJson = localStorage.getItem(this.localStorageKey);
    if (userJson){
      let data = JSON.parse(userJson);
      let cartData = data.cart;
      const existingItem = cartData.find((item: Cart) => item.id === product.id);

      if (existingItem) {
        existingItem.qty = product.qty; 
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
        console.log(JSON.stringify(data));
        return true;
      } else {
        cartData.push(product); 
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
        console.log(JSON.stringify(data));
        return true;
      }
    }
    console.log("Prodotto presente")
    return false;
  }  

  getCart() :Cart[] {
    let userJson = localStorage.getItem(this.localStorageKey);
    if(userJson){
      let data = JSON.parse(userJson);
      return data.cart;
    }
    return [];
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
