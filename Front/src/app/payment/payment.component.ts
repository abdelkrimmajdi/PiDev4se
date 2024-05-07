import { style } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { error } from 'console';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentComplete: boolean = false;
  paymentMethod: string = 'bank'; // Default payment method
  discountCode: string = '';
  constructor(private route:Router,private emailService:CartService) { }
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);

  submitPayment() {
  
    if (this.isValidDiscountCode(this.discountCode)) {
      this.applyDiscount();
    }
    this.route.navigateByUrl('/paypal')
    const mail = {
      from: "vitavibesesprit@gmail.com",
      to: this.userconnect.email,
      subject: 'Payement effectué avec succès',
      content: 'Payement effectué avec succès'
    };
    this.emailService.sendEmailMarket(mail).subscribe(
      () => {
        console.log('Email envoyé avec succès');
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
      }
    );
  }

  isValidDiscountCode(code: string): boolean {
    // Implement your validation logic here
    // For example, check if the code matches a predefined list of valid discount codes
    // You can also perform backend validation for security
    return code === 'MYDISCOUNT'; // Example code
  }

  applyDiscount() {
    // Apply 50% discount to the total 
    const priceSub = parseInt(localStorage.getItem('total') || '0');
    localStorage.setItem('total', (priceSub*0.5).toString())
  }
}
