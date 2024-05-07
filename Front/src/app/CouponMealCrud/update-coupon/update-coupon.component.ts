import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponMeal } from 'src/app/model/CouponMeal';
import { CouponMealService } from 'src/app/services/coupon-meal.service';

@Component({
  selector: 'app-update-coupon', 
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css'],
})
export class UpdateCouponComponent implements OnInit {
  coupon: CouponMeal | null = null; // Pour stocker le coupon récupéré
  couponForm: FormGroup; // Pour gérer le formulaire
  couponId: number | undefined; // Pour stocker l'ID du coupon
  errorMessage: string | null = null; // Propriété pour gérer les erreurs

  constructor(
    private couponMealService: CouponMealService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Configuration du formulaire avec des validations
    this.couponForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      minTotalPrice: ['', [Validators.required, Validators.min(0)]],
      maxTotalPrice: ['', [Validators.required, Validators.min(0)]],
      expiryDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID du coupon à partir de l'URL
    this.couponId = this.route.snapshot.params['id'];

    // Charger le coupon existant
    if (this.couponId) {
      this.loadCoupon(this.couponId);
    }
  }

  loadCoupon(couponId: number): void {
    this.couponMealService.getCouponById(couponId).subscribe(
      (data) => {
        this.coupon = data;
        // Préréglage des valeurs du formulaire avec le coupon récupéré
        this.couponForm.patchValue({
          name: data.name,
          discountPercentage: data.discountPercentage,
          minTotalPrice: data.minTotalPrice,
          maxTotalPrice: data.maxTotalPrice,
          expiryDate: data.expiryDate,
        });
      },
      (error) => {
        this.errorMessage = "Erreur lors du chargement du coupon.";
        console.error(error);
      }
    );
  }

  updateCoupon(): void {
    if (this.couponId && this.couponForm.valid) {
      // Mettre à jour le coupon avec les nouvelles données
      const updatedCoupon = this.couponForm.value;

      this.couponMealService.updateCoupon(this.couponId, updatedCoupon).subscribe(
        (data) => {
          console.log(' Succes Update', data);
          this.router.navigate(['/admin/AllCoupon']); // Redirige vers la liste des coupons après la mise à jour
        },
        (error) => {
          this.errorMessage = "Erreur lors de la mise à jour du coupon.";
          console.error(error);
        }
      );
    } else {
      this.errorMessage = "Validate All Inputs";
    }
  }
}
