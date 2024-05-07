import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponMeal } from 'src/app/model/CouponMeal';
import { CouponMealService } from 'src/app/services/coupon-meal.service';

@Component({
  selector: 'app-list-coupons',
  templateUrl: './list-coupons.component.html',
  styleUrls: ['./list-coupons.component.scss']
})
export class ListCouponsComponent implements OnInit {
  coupons: CouponMeal[] = [];
  filteredCoupons: CouponMeal[] = [];
  searchName: string = '';
  searchDiscount: number | null = null; 

  constructor(private couponMealService: CouponMealService, private router: Router) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.couponMealService.getAllCoupons().subscribe({
      next: (data) => {
        this.coupons = data;
        this.filteredCoupons = data; // Initialize with all coupons
      },
      error: (err) => {
        console.error('Erreur lors du chargement des coupons', err);
      },
    });
  }

  deleteCoupon(couponId: number): void {
    if (confirm('Delete Coupon Now ?')) {
      this.couponMealService.deleteCoupon(couponId).subscribe({
        next: () => {
          this.filteredCoupons = this.filteredCoupons.filter(c => c.id !== couponId); // Remove from filtered list
          this.coupons = this.coupons.filter(c => c.id !== couponId); // Remove from main list
          console.log('Delete');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du coupon', err);
        },
      });
    }
  }

  navigateToCouponDetails(couponId: number): void {
    this.router.navigate(['/admin/coupon', couponId]);
  }

  // Filter coupons based on search criteria
  filterCoupons(): void {
    this.filteredCoupons = this.coupons.filter(coupon => {
      const nameMatches = this.searchName
        ? coupon.name.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const discountMatches = this.searchDiscount !== null
        ? coupon.discountPercentage >= this.searchDiscount
        : true;

      return nameMatches && discountMatches;
    });
  }
  creatCoupon() {
    this.router.navigate(['/admin/CreateCoupon']);
  }
}
