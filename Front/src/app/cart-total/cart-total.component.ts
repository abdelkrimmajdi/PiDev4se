import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user.model';
import { CartMealDetail } from '../model/CartMealDetail';
import { CartmealService } from '../services/cartmeal.service';
import { CouponMealService } from '../services/coupon-meal.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss']
})
export class CartTotalComponent implements OnInit {
  totalPrice: number | null = null;
  couponName: string = ''; // Champ pour le nom du coupon
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
  cartDetails: CartMealDetail[] = []; // Détails des repas dans le panier


  constructor(
    private cartMealService: CartmealService,
    private couponMealService: CouponMealService,
    private router: Router // Injecter le service Router
  ) {}

  ngOnInit(): void {
    this.loadTotalPrice(); // Charger le prix total
    this.loadCartDetails(); // Charger les détails du panier à l'initialisation

  }
  
  loadCartDetails(): void {
    if (this.userconnect) {
      this.cartMealService.getCartMealDetails(this.userconnect.id).subscribe({
        next: (details) => {
          this.cartDetails = details; // Mettre à jour les détails du panier
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails du panier', err);
        },
      });
    }
  }

  loadTotalPrice(): void {
    if (this.userconnect) {
      this.cartMealService.getTotalPriceByUserId(this.userconnect.id).subscribe({
        next: (totalPrice) => {
          this.totalPrice = totalPrice; // Mettre à jour le prix total
          this.showCouponNotification(totalPrice); // Vérifier si une notification de coupon doit être affichée
        },
        error: (err) => {
          console.error("Erreur lors du chargement du prix total", err);
        },
      });
    }
  }

  showCouponNotification(cartTotalPrice: number): void {
    // Récupérer les détails du coupon applicable
    this.couponMealService.getAllCoupons().subscribe({
      next: (coupons) => {
        const applicableCoupon = coupons.find(
          (coupon) => cartTotalPrice >= coupon.minTotalPrice && cartTotalPrice <= coupon.maxTotalPrice
        );

        if (applicableCoupon) { // Afficher une notification si un coupon est applicable
          console.log(`Coupon applicable: ${applicableCoupon.name}`);
        }
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des coupons", err);
      },
    });
  }

  applyCoupon(): void {
    if (this.couponName.trim() === '') {
      console.error("Veuillez entrer un nom de coupon.");
      return; // Arrêtez l'exécution si le champ est vide
    }

    if (this.totalPrice !== null) {
      this.couponMealService.applyCoupon(this.couponName, this.totalPrice).subscribe({
        next: (adjustedTotal) => {
          this.totalPrice = adjustedTotal; // Mettre à jour le prix total

          // Rediriger vers la même page pour rafraîchir
          setTimeout(() => {
            this.router.navigate(['/cart']); // Redirige vers la même page
          }, 500); // Délai avant la redirection (optionnel)
        },
        error: (err) => {
          console.error("Erreur lors de l'application du coupon", err);
        },
      });
    }
  }
  applyChanges(): void {
    this.cartDetails.forEach(detail => {
      this.cartMealService.updateMealQuantity(this.userconnect.id, detail.mealName, detail.quantity).subscribe({
        next: () => {
          // Forcer le rafraîchissement après avoir appliqué les changements
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart']); // Retour à la page du panier
          });
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la quantité', err);
        },
      });
    });
  }
  
updateMealQuantity(mealName: string, quantity: number): void {
  if (this.userconnect) {
    this.cartMealService.updateMealQuantity(this.userconnect.id, mealName, quantity).subscribe({
      next: () => {
        this.loadTotalPrice(); // Rafraîchir le prix total
        this.loadCartDetails(); // Rafraîchir les détails des repas
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la quantité', err);
      },
    });
  }
}
removeMealByName(mealName: string): void {
  if (this.userconnect && mealName) {
    this.cartMealService.removeMealByName(this.userconnect.id, mealName).subscribe({
      next: () => {
        this.loadCartDetails(); // Recharge les détails du panier après suppression
      },
      error: (err) => {
        console.error("Erreur lors de la suppression du repas du panier", err);
      },
    });
  }
}
updateQuantity(mealName: string, newQuantity: number): void {
  if (this.userconnect && mealName && newQuantity > 0) {
    // Trouver le repas à mettre à jour dans le panier
    const mealToUpdate = this.cartDetails.find(
      (detail) => detail.mealName === mealName
    );

    if (mealToUpdate) {
      // Mettre à jour la quantité et recalculer le prix total
      mealToUpdate.quantity = newQuantity;
      this.updateTotalPrice(); // Recalculer le prix total
    }
  } }
  updateTotalPrice(): void {
    // Recalculer le prix total en parcourant les détails du panier
    this.totalPrice = this.cartDetails.reduce(
      (total, detail) => total + detail.quantity * detail.mealPrice,
      0
    );
  }
  tooltipClicked() {
    this.router.navigate(['/resto']);
  }
}


