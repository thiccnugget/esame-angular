import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../utils/localStorage/local-storage.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  currentUsername: string | null = null;
  loginFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    const storedUser = this.localStorage.getUserData();
    if (storedUser) {
      this.isLoggedIn = true;
      this.currentUsername = storedUser.username;
    }
    

    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    if (storedUser) {
      console.log('Dati presenti nel localStorage:', storedUser);
      alert('Dati presenti nel localStorage: ' + JSON.stringify(storedUser));
    } else {
      console.log('Non ci sono dati nel localStorage.');
      alert('Non ci sono dati nel localStorage.');
    }
  }
  

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const { username, password } = this.loginFormGroup.value;
      const storedUser = this.localStorage.getUserData();
      
      if (storedUser) {
        if (username === storedUser.username && bcrypt.compareSync(password, storedUser.hashedPassword)) {
          this.isLoggedIn = true;
          this.router.navigate(['/home']);
          console.log('Login successful');
        } else {
          if (username !== storedUser.username) {
            console.log('Invalid username');
          } else {
            console.log('Invalid password');
            console.log('bcrypt.compareSync result:', bcrypt.compareSync(password, storedUser.hashedPassword));
          }
        }
      } else {
        console.log('User not found');
      }
    } else {
      console.log('Form not valid');
    }
  }
  
  

  signup() : void {
    this.router.navigate(['signup']);
  }
  logout(): void {
    this.isLoggedIn = false;
  }
}
