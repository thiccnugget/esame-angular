import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../utils/localStorage/local-storage.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule]
})

export class LoginComponent implements OnInit {
  public isLoggedIn = false;
  public currentUsername: string | null = null;
  loginFormGroup!: FormGroup;

  constructor( private router: Router ) {}

  private fb: FormBuilder = new FormBuilder;
  private localStorage: LocalStorageService = new LocalStorageService;
  

  ngOnInit() {
    const storedUser = this.localStorage.getUserData();
    console.log( this.localStorage.getUserData() )
    if (storedUser) {
      this.currentUsername = storedUser.username;
      //console.log("sono qui", storedUser, this.isLoggedIn, this.currentUsername)
      this.isLoggedIn = true;
    }

    if(this.isLoggedIn){
      //this.router.navigate(['/home']);
    }
    

    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    if (storedUser) {
      console.log('Dati presenti nel localStorage:', storedUser);
      //alert('Dati presenti nel localStorage: ' + JSON.stringify(storedUser));
    } else {
      console.log('Non ci sono dati nel localStorage.');
      //alert('Non ci sono dati nel localStorage.');
    }
  }
  

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const { username, password } = this.loginFormGroup.value;
      const storedUser = this.localStorage.getUserData();
      
      if (storedUser) {
        if (username === storedUser.username && bcrypt.compareSync(password, storedUser.hashedPassword)) {
          this.isLoggedIn = true;
          this.currentUsername = username;
          this.router.navigate(['/home']);
          console.log('Login successful', this.currentUsername);
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
    this.router.navigate(['/signup']);
  }
  public logout(): void {
    console.log('logout');
    this.isLoggedIn = false;
  }
}
