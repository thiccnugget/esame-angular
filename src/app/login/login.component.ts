import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidatorsCustom from '../utils/customValidators';

const dataUpdated = {
  email: undefined
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder) {}

  submitted = false;

  exampleForm!: FormGroup;


  ngOnInit() {
    this.exampleForm = this.fb.group({
      email: [dataUpdated && dataUpdated.email ? dataUpdated.email : '' , Validators.compose([
        Validators.required, Validators.minLength(12)
      ])],
      password: ['password', ValidatorsCustom.createPasswordStrengthValidator()]
    })
  }

  onSubmit = () => {
    this.submitted = true;
    console.log('exampleForm: ',this.exampleForm.value);
  }
}
