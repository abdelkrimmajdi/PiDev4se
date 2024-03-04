import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercice } from '../models/exercice';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
  private baseUrl : string = 'http://localhost:8081/exercices';

  constructor(private http: HttpClient) { }

  getAllExercices(): Observable<Exercice[]> {
    return this.http.get<Exercice[]>( this.baseUrl);
  }

  createExercice(exercice: Exercice): Observable<Exercice> {
    return this.http.post<Exercice>(this.baseUrl, exercice);
  }
}
