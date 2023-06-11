import { Component } from '@angular/core';

interface CartItem {
    id: number;
    name: string;
    price: number;
  }
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  cartItems: CartItem[] = [];
}
