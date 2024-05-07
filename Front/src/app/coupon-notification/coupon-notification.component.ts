import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { CartmealService } from '../services/cartmeal.service';
import { User } from '../model/user.model';
import { CouponMealService } from '../services/coupon-meal.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-coupon-notification',
  templateUrl: './coupon-notification.component.html',
  styleUrls: ['./coupon-notification.component.scss']
})
export class CouponNotificationComponent implements OnInit {
  notificationMessage: string | null = null;
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);

  constructor(
    private notificationService: NotificationService,
    private cartMealService: CartmealService,
    private couponMealService: CouponMealService // Pour obtenir les détails des coupons
  ) {}

  ngOnInit(): void {
    if (this.userconnect) {
      this.cartMealService
        .getTotalPriceByUserId(this.userconnect.id) // Obtenir le prix total du panier
        .subscribe({
          next: (totalPrice) => {
            this.checkForCouponNotification(totalPrice); // Vérifier s'il existe un coupon applicable
          },
          error: (err) => {
            console.error("Erreur lors du chargement du prix total du panier", err);
          },
        });
    }
  }

  checkForCouponNotification(cartTotalPrice: number): void {
    this.couponMealService.getAllCoupons().subscribe({
      next: (coupons) => {
        const applicableCoupon = coupons.find(
          (coupon) => cartTotalPrice >= coupon.minTotalPrice && cartTotalPrice <= coupon.maxTotalPrice
        );

        if (applicableCoupon) { // Si un coupon est applicable, afficher la notification
          this.notificationMessage = `use coupon '${applicableCoupon.name}' for discount`;
        } else {
          this.notificationMessage = null; // Aucune notification s'il n'y a pas de coupon applicable
        }
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des coupons", err);
      },
    });
  }
  closeNotification(): void {
    this.notificationMessage = null; // Masquer la notification
  }
}
