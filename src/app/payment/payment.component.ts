import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { PaymentService } from './payment.service';
import { Payment } from './payment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  processingPayment = false;
  paymentResult: string | null = null;
  paymentForm: FormGroup;
  cvvFieldTouched = false;
  constructor(private datePipe: DatePipe, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private paymentService: PaymentService) {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: [Validators.required],
      cvv: ['', Validators.required],
      name: ['', Validators.required],
      amount: [Validators.required],
      email: [Validators.required],
      internshipId: [Validators.required]

      // Add other form controls and validators here
    });
  }
  isExpirationDateDisabled: boolean = true;
  errorMessage:string | undefined;
  studentId: String = '';
  internshipId: String = ''
  isPaymentSuccessful: Boolean = false;
  payment: Payment | undefined;
  amount: number = 0;
  @ViewChild('datepicker', { read: ElementRef }) datepicker!: ElementRef;
  @ViewChild(BsDatepickerDirective, { static: false }) datepickerDirective!: BsDatepickerDirective;

  ngAfterViewInit() {
    if (this.datepickerDirective) {
      this.datepickerDirective.hide();
    }
    if (this.datepicker) {
      this.datepicker.nativeElement.readOnly = true;
    }
  }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.studentId = params['email']; // Parse the student ID as a number
      this.internshipId = params['internshipId'];
      this.amount = params['price']; // Parse the internship ID as a number
    });
    console.log("Student is ", this.studentId, this.internshipId)
  }
  public formattedExpiryDate(expiryDate: string): string {
    const date = new Date(expiryDate);
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  
    return formattedDate || expiryDate;
  }
  makePayment() {
    this.payment = this.paymentForm.value;
    if (this.payment && this.payment.expiryDate) {
      this.payment.email = this.studentId;
      this.payment.internshipId = this.internshipId;
      this.payment.amount = this.amount;
      this.payment.expiryDate = this.formattedExpiryDate(this.payment.expiryDate);

    }
    console.log("Payment is ", this.payment)
    // Simulate payment processingis
    this.paymentService.makePayment(this.paymentForm.value).subscribe(data => {
      this.processingPayment = true;
      setTimeout(() => {


        setTimeout(() => {
          console.log('hurray', data.message);
      
            this.paymentResult = 'success';
            this.router.navigate(['/student'], {
              queryParams: { email: this.studentId }
            });
        }, 10000); // 10 seconds
      }, 2000);
      
    },
    (error) => {
      console.log('Error occurred:', error);
      this.paymentResult = 'failure'
      this.errorMessage = error.error.message;
      console.log("error is ", this.errorMessage)
    })

 // 2 seconds (simulated payment processing time)
  }
}
