import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MentorExercice } from '../model/MentorExercice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorExerciceService {
  apiUrl: string = `http://localhost:8081/Mentor`;
  constructor(private http:HttpClient) { }
  getAllMentorExercices(): Observable<MentorExercice[]> {
    return this.http.get<MentorExercice[]>('http://localhost:8081/Mentor/getAllMentorExercices')
  }

  getMentorExerciceById(id:number){
    return this.http.get<MentorExercice>('http://localhost:8081/Mentor/getMentorExerciceById'+'/'+id)
  }
  createMentorExercice(p:MentorExercice){
    return this.http.post('http://localhost:8081/Mentor/createMentorExercice',p)
  }
  deleteMentorExercice(id:number){
    return this.http.delete('http://localhost:8081/Mentor/deleteMentorExercice'+'/'+id)
  }
  updateMentorExercice(p:MentorExercice,id:number){
    return this.http.put('http://localhost:8081/Mentor/updateMentorExercice'+'/'+id,p)
  }
  searchExercisesByName(name:string){
    return this.http.get('http://localhost:8081/Mentor/searchExercises'+'/'+name)
  }
  assignExerciceToProgram(exerciceId: number, programmeId: number): Observable<void> {
    const url = `${this.apiUrl}/assignExerciceToProgram/${exerciceId}/${programmeId}`;
    return this.http.post<void>(url, {});
  }
}
