import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidatorsCustom from '../utils/customValidators';
import { LocalStorageService } from '../utils/localStorage/local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  currentUsername: string | null = null;
  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private router: Router
    ) {}

  submitted = false;

  signUpForm!: FormGroup;


  ngOnInit() {
    const storedUser = this.localStorage.getUserData();
    if(storedUser){
      this.currentUsername = storedUser.username;
    }
    

    /*if (storedUser) {
      console.log('Dati presenti nel localStorage:', storedUser);
      alert('Dati presenti nel localStorage: ' + JSON.stringify(storedUser));
    } else {
      console.log('Non ci sono dati nel localStorage.');
      alert('Non ci sono dati nel localStorage.');
    }*/
    this.signUpForm = this.fb.group({
      username: [storedUser?.username || '', Validators.required],
      email: [storedUser?.email || '', Validators.compose([
        Validators.required, Validators.minLength(12)
      ])],
      password: ['password', ValidatorsCustom.createPasswordStrengthValidator()]
    });
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.signUpForm.valid) {
      const {username, email, password} = this.signUpForm.value;
      this.localStorage.saveUserData(username, email, password);
      console.log('User registered successfully');
      this.router.navigate(['/login']);
    } else {
      console.log('Form not valid');
    }
  }
  ngOnDestroy() {
    this.clearUserData();
  }

  clearUserData(): void {
    this.localStorage.clearUserData();
    console.log('User data removed from localStorage');
    
  }
}

