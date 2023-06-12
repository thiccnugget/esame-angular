import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <div class="not-found-text mb-5">404</div>
      <button mat-raised-button color="primary" (click)="navigateToHome()">Go to Home</button>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 75vh;
    }

    .not-found-text {
      font-size: 6rem;
      font-weight: bold;
      color: orange;
    }
  `]
})
export class NotFoundComponent {
  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
