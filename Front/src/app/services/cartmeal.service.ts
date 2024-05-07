import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartMeal } from '../model/CartMeal';
import { CartMealDetail } from '../model/CartMealDetail';

@Injectable({
  providedIn: 'root'
})
export class CartmealService {
  private baseUrl = 'http://localhost:8081/api/cart'; // Changez l'URL selon votre backend

  constructor(private http: HttpClient) {}

  // Obtenir le panier d'un utilisateur
  getCartByUserId(userId: number): Observable<CartMeal> {
    return this.http.get<CartMeal>(`${this.baseUrl}/user/${userId}`);
  }

  // Ajouter un repas au panier
  addMealToCart(userId: number, mealId: number , quantity: number): Observable<CartMeal> {
    return this.http.post<CartMeal>(`${this.baseUrl}/add/${userId}/${mealId}/${quantity}`, {});
  }
  getTotalPriceByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalprice/user/${userId}`);
  }
 
  getCartMealDetails(userId: number): Observable<CartMealDetail[]> {
    return this.http.get<CartMealDetail[]>(`${this.baseUrl}/user/${userId}/details`);
  }
  removeMealByName(userId: number, mealName: string): Observable<CartMeal> {
    return this.http.delete<CartMeal>(`${this.baseUrl}/remove-meal-by-name`, {
      params: {
        userId: userId.toString(),
        mealName: mealName,
      },
    });
  }

  
  updateMealQuantity(userId: number, mealName: string, quantity: number): Observable<CartMeal> {
    return this.http.put<CartMeal>(
      `${this.baseUrl}/update-quantity/${userId}/${mealName}`, // URL avec des segments
      null, // Pas de corps
      {
        params: { quantity: quantity.toString() },
      },
    );
  }
}