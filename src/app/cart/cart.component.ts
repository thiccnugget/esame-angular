import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import axios from 'axios';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products:any;
  cartItems: any
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log('this is my product', this.cartItems[0].product);
    }
}
//  const products: any[] = [];
  
//     this.cartItems.forEach(item => {
//       axios.get(`https://dummyjson.com/products/${item.id}`)
//         .then(response => {
//           const product = response.data;
//           console.log(response.data)
//           products.push(product);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     });
  
//     this.products = products; // Assign the products array to the component property
//     console.log('Products:', products);
//   }