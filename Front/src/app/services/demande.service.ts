import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../model/Demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private baseUrl = 'http://localhost:8081/demande';

  constructor(private http: HttpClient) { }

  
  participate(id:number,demande:Demande){
    return this.http.post<Demande>("http://localhost:8081/demande/"+id+"/1",demande);
    }

  annulerDemande(ide: number, idu: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/not/${ide}/${idu}`, {});
  }

  accepterDemande(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/accept/${id}`, {});
  }

  rejeterDemande(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reject/${id}`, {});
  }

  supprimerDemande(ide: number, idu: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/del/${ide}/${idu}`);
  }

  getMesDemandes(idu: number): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.baseUrl}/mes/${idu}`);
  }

  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.baseUrl);
  }
  participerEvenement(ide: number, idu: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${ide}/${idu}`, {});
  }
}
