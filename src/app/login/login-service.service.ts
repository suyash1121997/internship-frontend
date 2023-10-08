import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  login(login: Login) {
    console.log('Login is ' , login)
    return this.http.post<any>("http://localhost:8081/internship/login", login);

  }

  constructor(private http: HttpClient) { }
}
