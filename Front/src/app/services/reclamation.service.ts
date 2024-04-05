import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private apiUrl = 'http://localhost:8081/api/reclamations'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les réclamations
  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour récupérer une réclamation par son ID
  getReclamationById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Méthode pour créer une nouvelle réclamation
  createReclamation(reclamation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reclamation);
  }

  // Méthode pour mettre à jour une réclamation existante
  updateReclamation(id: number, reclamation: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, reclamation);
  }

  // Méthode pour supprimer une réclamation
  deleteReclamation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
