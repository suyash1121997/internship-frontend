import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentComponent } from '../student/student.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  @Input() cart: any[] = [];
  @Input() cartItems: any[] = [];
  @Output() removeFromCartEvent = new EventEmitter<any>();
  @Output() applyForInternshipEvent = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() isCartOpen: boolean = true;
  removeFromCart(item: any) {
    this.removeFromCartEvent.emit(item);
  }

  applyForInternship(item: any) {
    this.applyForInternshipEvent.emit(item);
  }
  ngOnInit() {
    this.isCartOpen = true
    console.log("Entered here and isCartOpen is ", this.cart)
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
