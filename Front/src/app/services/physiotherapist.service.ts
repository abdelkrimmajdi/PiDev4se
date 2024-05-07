import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhysiotherapistService {

  private apiUrl = 'http://localhost:8081/api/physiotherapists'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les physiothérapeutes
  getAllPhysiotherapists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour récupérer un physiothérapeute par son ID
  getPhysiotherapistById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Méthode pour créer un nouveau physiothérapeute
  createPhysiotherapist(physiotherapist: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, physiotherapist);
  }

  // Méthode pour mettre à jour un physiothérapeute existant
  updatePhysiotherapist(id: number, physiotherapist: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, physiotherapist);
  }

  // Méthode pour supprimer un physiothérapeute
  deletePhysiotherapist(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
