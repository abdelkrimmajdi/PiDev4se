import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../Model/Apoointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = "http://localhost:8081/appointments"; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les rendez-vous
  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour récupérer un rendez-vous par son ID
  getAppointmentById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Méthode pour créer un nouveau rendez-vous
  createAppointment(physiotherapistId: number, appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add?physiotherapistId=${physiotherapistId}`, appointment);
  }

  // Méthode pour mettre à jour un rendez-vous existant
  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  // Méthode pour supprimer un rendez-vous
  deleteAppointment(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  checkSimilarAppointmentExists(physiotherapistId: number, dayApp: string, timeApp: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/existsByPhysiotherapistAndDayAppAndTimeApp?physiotherapistId=${physiotherapistId}&dayApp=${dayApp}&timeApp=${timeApp}`);
  }


  
}
