import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Cart, Product, ProductDetails} from '../utils/types';
import { LocalStorageService } from '../utils/localStorage/local-storage.service';
import axios from 'axios';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports:[CommonModule, RouterModule]
})


export class CartComponent {
  localStorage = new LocalStorageService();
  products: ProductDetails[] = [];
  total: number = 0;

  ngOnInit() {
    const elements = this.localStorage.getCart()
    elements.map((item:Cart)=>{
      axios.get("https://dummyjson.com/products/"+item.id)
      .then((response) => {this.total+=(item.qty*response.data.price); this.products.push({...response.data, quantity: item.qty})})
      .catch((error) => console.log(error))
    })
    console.log(this.products)
  }
}
