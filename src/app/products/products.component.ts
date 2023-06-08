import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  ngOnInit() {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        const responseData = response.data;
        if (Array.isArray(responseData)) {
          this.products = responseData;
        } else if (typeof responseData === 'object' && responseData.hasOwnProperty('products')) {
          this.products = responseData.products;
        } else {
          console.error('Dati API non validi:', responseData);
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  }
}
