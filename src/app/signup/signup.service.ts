import { Injectable } from '@angular/core';
import { Signup } from './signup';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  signup(signup: Signup) {
    console.log('Login is ' +signup.email)
    return this.http.post<any>("http://localhost:8081/internship/signup", signup);
  }

  constructor(private http: HttpClient) { }
}
