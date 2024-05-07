import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteMeal } from '../model/FavoriteMeal';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMealService {
  private baseUrl = 'http://localhost:8081/api/favorites'; // Changez l'URL selon votre backend

  constructor(private http: HttpClient) {}

  // Ajouter un repas comme favori
  addFavorite(userId: number, mealId: number): Observable<FavoriteMeal> {
    return this.http.post<FavoriteMeal>(`${this.baseUrl}/add?userId=${userId}&mealId=${mealId}`, {
      
    });
  }
  

  // Supprimer un repas des favoris
  removeFavorite(userId: number, mealId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/favorites/remove?userId=${userId}&mealId=${mealId}`);
  }

  // Obtenir les favoris d'un utilisateur
  getFavoritesByUser(userId: number): Observable<FavoriteMeal[]> {
    return this.http.get<FavoriteMeal[]>(`${this.baseUrl}/user/${userId}/favorites`);
  }
}

