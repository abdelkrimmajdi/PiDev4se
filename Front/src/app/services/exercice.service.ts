import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercice } from '../models/exercice';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
  
  constructor(private http: HttpClient) { }

  private baseUrl : string = 'http://localhost:8081/exercices';

  getAllExercices(): Observable<Exercice[]> {
    return this.http.get<Exercice[]>( this.baseUrl);
  }

  getExerciceById(id: number) {
    return this.http.get<Exercice>(this.baseUrl+'/'+id)
  }

  createExercice(exercice: Exercice): Observable<Exercice> {
    return this.http.post<Exercice>(this.baseUrl, exercice);
  }

  deleteExercice(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }

  updateExercice(e:Exercice, id:number){
    return this.http.put(this.baseUrl + '/' + id,e);
  }

  getExercicesByName(name: string): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(this.baseUrl+'/name/'+name);
  }
  
}
