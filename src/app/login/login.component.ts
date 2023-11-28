import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from './login-service.service';
import { Login } from './login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  email: String = ''
  password: String = ''
  loginMode: String = ''
  loginError: string = ''
  constructor(private router: Router, private formbuilder: FormBuilder, private loginDetails: LoginServiceService) {}
 ngOnInit(): void {
  this.loginForm = this.formbuilder.group({
    email: ['',  Validators.email],
    password: ['', Validators.required],
    loginMode: ['', Validators.required]
  })
 }
  onSubmit(): void {
    console.log("username is " , this.loginForm.value)
    this.loginDetails.login(this.loginForm.value).subscribe(data => {
      if(data.statusCode == '200') {
        console.log("here1", this.loginForm.value.loginMode)
        this.loginMode = this.loginForm.value.loginMode;
      if(this.loginMode == "STUDENT") {
        console.log("here1")
        this.router.navigate(['student'], { queryParams: { email: this.loginForm.value.email } });
      }
      else {
        this.router.navigate(['mentor']);
      }
      }
      this.loginError = data.message
      console.log('hurray' , data);
    })
  }
}
