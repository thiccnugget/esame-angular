import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { LocalStorageService } from '../utils/localStorage/local-storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  id: any;
  products: any; // Add the 'products' property
  value!: number; 
  localStorage = new LocalStorageService();
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchProductDetails();
    });
  }

  fetchProductDetails(): void {
    const url = `https://dummyjson.com/products/${this.id}`;

    

    axios.get(url)
      .then(response => {
        this.products = response.data; // Assign the fetched product details to 'products'
      })
      .catch(error => {
        console.error(error);
      });
  }

  inputValue = 1;

  handlePlusClick(): void {
    this.inputValue++;
  }

  handleMinusClick(): void {
    if (this.inputValue > 1) {
      this.inputValue--;
    };
  }
}
