import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private apiUrl = 'http://localhost:8081/responses'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les réponses
  getAllResponses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour récupérer une réponse par son ID
  getResponseById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Méthode pour créer une nouvelle réponse
  createResponse(response: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, response);
  }

  // Méthode pour mettre à jour une réponse existante
  updateResponse(id: number, response: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, response);
  }

  // Méthode pour supprimer une réponse
  deleteResponse(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
