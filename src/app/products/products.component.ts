import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ProductResponse } from '../utils/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})




export class ProductsComponent implements OnInit {
  products: ProductResponse | undefined;

  constructor (){
    let products: ProductResponse;
  }




  ngOnInit() {
    axios.get<ProductResponse>('https://dummyjson.com/products')
      .then(response => {
        this.products = response.data
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  }
}
