import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { CartComponent } from '../cart/cart.component';
import { Internship } from './Internship';
import 'bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  internships: Internship[] = [];
  searchQuery: string = '';
  filteredInternships: Internship[] = [];
  pagedInternships: Internship[] = [];
  cart: any[] = [];
  currentPage = 1;
  itemsPerPage = 2; // Adjust the number of items per page
  pages: number[] = [];
  currentUser: any = {};
  email: any;
;

  constructor(private studentService: StudentService, private router:Router, private activated: ActivatedRoute ) {
    this.activated.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  ngOnInit() {
   console.log('Email is ', this.email)
    this.studentService.getInternships().subscribe(
      (data) => {
        console.log("Data is ", data.details);
        this.internships = [...data.details];
        this.filteredInternships = this.internships;
        this.calculatePageNumbers();
        this.setPage(this.currentPage);
        console.log("Internship is ", this.internships);
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  applyForInternship(internship: any) {
    console.log('here we go', this.currentUser.id)
    // Implement the logic to handle the application, e.g., open a form or send a request to the backend.    
    this.router.navigate(['/payment'], {
      queryParams: {
        email: this.email, // Replace with the actual student ID field.
        internshipId: internship.id,
        price: internship.price // Replace with the actual internship ID field.
      }
    });

    console.log(`Applied for ${internship.title}`);
  }
  isCartOpen = false;

  openCartModal() {
    this.isCartOpen = true;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  addInternship(internship: any) {
    // Add the selected internship to the cart
    this.cart.push(internship);
  }

  removeFromCart(item: any) {
    // Remove the selected item from the cart
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  proceedToPayment() {
    // Implement logic for proceeding to payment
  }
  filterInternships() {
    this.filteredInternships = this.internships.filter(internship =>
      internship.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      internship.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.calculatePageNumbers();
    this.setPage(1); // Reset to the first page after filtering
  }

  addToCart(internship: any) {
    this.cart.push(internship);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(this.cart);
  }

  viewCart() {
    console.log(this.cart); 
  }

  showCartModal = false;

 

  closeCartModal() {
    this.showCartModal = false;
  }


  calculatePageNumbers() {
    const totalPages = Math.ceil(this.filteredInternships.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pages.length) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    this.pagedInternships = this.filteredInternships.slice(startIndex, startIndex + this.itemsPerPage);
  }

  previousPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }
}
