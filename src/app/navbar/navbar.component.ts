import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../utils/localStorage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MatToolbarModule],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    LoginComponent
  ]
})

export class NavbarComponent {
  constructor(private router: Router){}
  localStorage = new LocalStorageService();
  login = new LoginComponent(this.router);


}
