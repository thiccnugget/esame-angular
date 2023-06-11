import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MatToolbarModule],
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule
  ]
})

export class NavbarComponent {

}
