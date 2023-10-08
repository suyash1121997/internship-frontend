// forgot-password.component.ts
import { Component } from '@angular/core';
import { ForgotPasswordService } from './forgot-password.service';
import { tap, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  submitted: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;
  otpEntered: boolean = false;
  otp: String = ''
  constructor(private forgotPasswordService: ForgotPasswordService) {}
  onSubmitOTP() {

  }
  onSubmit() {
    this.submitted = true;
    this.error = null;
    this.successMessage = null;

    this.forgotPasswordService.sendPasswordResetEmail(this.email)
      .pipe(
        tap(() => {
          this.successMessage = 'Password reset email sent successfully.';
        }),
        catchError((error) => {
          this.error = 'An error occurred. Please try again later.'; // Handle specific error messages as needed
          return throwError(error);
        })
      )
      .subscribe();
  }
}
