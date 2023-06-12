import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'esame';
  constructor(private router: Router) {}

  fetchData(): void {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        const id = response.data.id; // Extract the 'id' parameter from the API response
        this.router.navigate(['/details', id]); // Navigate to the DetailsComponent with the 'id' parameter
      })
      .catch(error => {
        console.error(error);
      });
  }
}
