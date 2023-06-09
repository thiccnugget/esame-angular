import { Component, OnInit } from '@angular/core';
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
  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService
    ) {}

  submitted = false;

  exampleForm!: FormGroup;


  ngOnInit() {
    const storedUser = this.localStorage.getUserData();

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
      console.log('User data saved into localStorage');
    } else {
      console.log('Form not valid');
    }
  }
}
