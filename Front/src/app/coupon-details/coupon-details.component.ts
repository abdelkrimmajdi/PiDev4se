import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponMeal } from '../model/CouponMeal';
import { CouponMealService } from '../services/coupon-meal.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
}) 
export class CouponDetailsComponent implements OnInit {
  coupon: CouponMeal | null = null; // Stocker les détails du coupon

  constructor(
    private route: ActivatedRoute,
    private couponMealService: CouponMealService,
    private router : Router
  ) {}

  ngOnInit(): void {
    // Obtenir l'ID du coupon à partir de l'URL
    const id = parseInt(this.route.snapshot.params['id'], 10);

    // Appeler le service pour récupérer les détails du coupon
    this.couponMealService.getCouponById(id).subscribe(
      (coupon) => {
        this.coupon = coupon; // Stocker les détails récupérés
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du coupon', error);
      }
    );
  }
  tooltipClicked() {
    this.router.navigate(['/admin/AllCoupon']);
  }
}
