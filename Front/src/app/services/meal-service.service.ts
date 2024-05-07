import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../model/Meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealServiceService {
  private baseUrl = 'http://localhost:8081/meals'; // Assurez-vous de changer l'URL en fonction de votre configuration Spring

  constructor(private http: HttpClient) { }

  getAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.baseUrl}`);
  }

  getMealById(id: number): Observable<Meal> {
    return this.http.get<Meal>(`${this.baseUrl}/${id}`);
  }

  createMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`${this.baseUrl}`, meal);
  }

  updateMeal(id: number, meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.baseUrl}/${id}`, meal);
  }

  deleteMeal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  uploadMealImage(id: number, file: File): Observable<any> {
    const formData = new FormData(); // Utilisation de FormData pour les fichiers
    formData.append('image', file); // Ajout du fichier au FormData

    return this.http.post(`${this.baseUrl}/${id}/upload-image`, formData); // Endpoint pour télécharger l'image
  }
}
