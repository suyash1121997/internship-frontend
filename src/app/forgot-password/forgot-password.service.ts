import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  sendPasswordResetEmail(email: string) {
    return this.http.post<any>('/api/forgot-password', { email });
  }
}