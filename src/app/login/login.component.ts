import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidatorsCustom from '../utils/customValidators';
import { LocalStorageService } from '../utils/localStorage/local-storage.service';

const dataUpdated = {
  email: undefined,
  username: undefined
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoggedIn = false;
  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService
    ) {}

  submitted = false;

  exampleForm!: FormGroup;


  ngOnInit() {
    const storedUser = this.localStorage.getUserData();
    this.isLoggedIn = storedUser !== null;

    /*if (storedUser) {
      console.log('Dati presenti nel localStorage:', storedUser);
      alert('Dati presenti nel localStorage: ' + JSON.stringify(storedUser));
    } else {
      console.log('Non ci sono dati nel localStorage.');
      alert('Non ci sono dati nel localStorage.');
    }*/

    this.exampleForm = this.fb.group({
      username: [storedUser?.username || '', Validators.required],
      email: [storedUser?.email || '', Validators.compose([
        Validators.required, Validators.minLength(12)
      ])],
      password: ['password', ValidatorsCustom.createPasswordStrengthValidator()]
    });
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.exampleForm.valid) {
      const {username, email} = this.exampleForm.value;
      this.localStorage.saveUserData(username, email, '');
      this.isLoggedIn = true;
      console.log('User data saved into localStorage');
      
    } else {
      console.log('Form not valid');
    }
  }

  logout(): void{
    this.isLoggedIn = false;
  }
  /*ngOnDestroy() {
    this.clearUserData();
  }

  clearUserData(): void {
    this.localStorage.clearUserData();
    this.isLoggedIn = false;
    console.log('User data removed from localStorage');
  }*/
}

