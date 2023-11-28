import { Injectable } from '@angular/core';
import { Payment } from './payment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  makePayment(payment: Payment) {
    console.log('Payment is ' ,payment)
    return this.http.post<any>("http://localhost:8081/internship/makePayment", payment);
  }

  constructor(private http: HttpClient) { }
}
