import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Assurez-vous d'importer throwError
import { CouponMeal } from '../model/CouponMeal';
import { catchError } from 'rxjs/operators'; // Import de catchError

@Injectable({
  providedIn: 'root'
})
export class CouponMealService {
  private baseUrl = 'http://localhost:8081/api/coupons'; // URL du backend

  constructor(private http: HttpClient) {}

  // Obtenir tous les coupons
  getAllCoupons(): Observable<CouponMeal[]> {
    return this.http.get<CouponMeal[]>(`${this.baseUrl}`);
  }

  // Obtenir un coupon par ID
  getCouponById(id: number): Observable<CouponMeal> {
    return this.http.get<CouponMeal>(`${this.baseUrl}/${id}`);
  }

  // Créer un nouveau coupon
  createCoupon(coupon: CouponMeal): Observable<CouponMeal> {
    return this.http.post<CouponMeal>(`${this.baseUrl}`, coupon);
  }

  // Mettre à jour un coupon
  updateCoupon(id: number, coupon: CouponMeal): Observable<CouponMeal> {
    return this.http.put<CouponMeal>(`${this.baseUrl}/${id}`, coupon);
  }

  // Supprimer un coupon
  deleteCoupon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Vérifier la validité d'un coupon
  isCouponValid(name: string, cartTotalPrice: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isValid/${name}/${cartTotalPrice}`);
  }

  // Appliquer un coupon à un panier pour obtenir le prix réduit
  applyCoupon(couponName: string, cartTotalPrice: number): Observable<number> {
    return this.http.post<number>(
      `${this.baseUrl}/apply`,
      {}, // Pas de corps pour POST
      {
        params: {
          couponName,
          cartTotalPrice: cartTotalPrice.toString(),
        },
      }
    );
  }
  getCouponByName(name: string): Observable<CouponMeal> {
    return this.http.get<CouponMeal>(`${this.baseUrl}/byName/${name}`);
  }}