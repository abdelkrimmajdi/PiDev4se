import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutSession } from '../models/workoutSession';
import { Exercice } from '../models/exercice';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  
  constructor(private http: HttpClient) { }

  private baseUrl : string = 'http://localhost:8081/workoutSessions';

  getAllWorkout(): Observable<WorkoutSession[]> {
    return this.http.get<WorkoutSession[]>( this.baseUrl);
  }

  getWorkoutById(id: number) {
    return this.http.get<WorkoutSession>(this.baseUrl+'/'+id)
  }

  createWorkout(workoutSession: WorkoutSession): Observable<WorkoutSession> {
    return this.http.post<WorkoutSession>(this.baseUrl, workoutSession);
  }

  deleteWorkout(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }

  updateWorkout(w:WorkoutSession, id:number){
    return this.http.put(this.baseUrl + '/' + id,w);
  }

  addExercisesToSession(workoutSessionId: number, exerciseIds: Set<number>): Observable<any> {
    const url = `${this.baseUrl}/${workoutSessionId}/addExercises`;
    return this.http.post(url, Array.from(exerciseIds));
  }
  
  getExercisesByWorkoutSessionId(workoutSessionId: number): Observable<Exercice[]> {
    const url = `${this.baseUrl}/${workoutSessionId}/exercises`;
    return this.http.get<Exercice[]>(url);
  }
}
