import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { passwordsMatchValidator }  from'./signup.validator'
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  
  signupForm: FormGroup;
  signupError: String ='';

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['',Validators.required],
      familyName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      loginMode: ['', Validators.required]
    }, {
      validators: passwordsMatchValidator // Add the custom validator
    });
  }
  onSubmit() {
    console.log("username is " , this.signupForm.value)
    this.signupService.signup(this.signupForm.value).subscribe(data => {
      this.signupError = data.message
      console.log('hurray' , data.message);
    })
  } 

}


