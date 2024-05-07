import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponMealService } from 'src/app/services/coupon-meal.service';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent {
  couponForm: FormGroup;

  constructor(
    private couponMealService: CouponMealService, 
    private fb: FormBuilder,
    private router : Router
  ) {
    this.couponForm = this.fb.group({
      name: ['', Validators.required],
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      minTotalPrice: ['', [Validators.required, Validators.min(0)]],
      maxTotalPrice: ['', [Validators.required, Validators.min(0)]],
      expiryDate: ['', Validators.required]
    });
  }

  createCoupon(): void {
    if (this.couponForm.valid) {
      const newCoupon = this.couponForm.value;
  
      this.couponMealService.createCoupon(newCoupon).subscribe({
        next: () => {
          alert('Coupon créé avec succès');
          
          // Réinitialiser le formulaire
          this.couponForm.reset();
  
          // Appeler la fonction pour obtenir tous les coupons
          this.getAllCoupons();
        },
        error: (err) => {
          console.error('Erreur lors de la création du coupon', err);
        }
      });
    }
  }
  getAllCoupons(): void {
    setTimeout(() => {
      this.router.navigate(['/admin/AllCoupon']); // Navigation vers la liste des repas
    }, 100);
  }  }

