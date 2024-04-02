import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MentorProgram } from '../model/MentorProgram';
import { MentorExercice } from '../model/MentorExercice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorProgramService {

  constructor(private http:HttpClient) { }
  apiUrl: string = `http://localhost:8081/Mentor`;
  getAllMentorPrograms(): Observable<MentorProgram[]>{
    return this.http.get<MentorProgram[]>('http://localhost:8081/Mentor/getAllMentorPrograms')
  }

  getMentorProgramById(id:number){
    return this.http.get<MentorProgram>('http://localhost:8081/Mentor/getMentorProgramById'+'/'+id)
  }
  createMentorProgram(p:MentorProgram){
    return this.http.post('http://localhost:8081/Mentor/createMentorProgram',p)
  }
  deleteMentorProgram(id:number){
    return this.http.delete('http://localhost:8081/Mentor/deleteMentorProgram'+'/'+id)
  }
  updateMentorProgram(p:MentorProgram,id:number){
    return this.http.put('http://localhost:8081/Mentor/updateMentorProgram'+'/'+id,p)
  }
  searchProgramsByName(name:string){
    return this.http.get('http://localhost:8081/Mentor/searchPrograms'+'/'+name)
  }
  assignProgramToUser(userId: number, programmeId: number): Observable<void> {
    const url = `${this.apiUrl}/assignProgramToUser/${userId}/${programmeId}`;
    return this.http.post<void>(url, {});
  }
  getMentorExercisesForProgram(programId: number): Observable<MentorExercice[]> {
    return this.http.get<MentorExercice[]>(`${this.apiUrl}/getMentorExercisesForProgram/${programId}`);
  }
  generatePDFForMentorProgramDetails(programId: number): Observable<Blob> {
    const url = `${this.apiUrl}/generatePDF/${programId}`;
    // Set responseType as 'blob' to handle binary data (PDF)
    return this.http.get(url, { responseType: 'blob' });
  }
  getMentorProgramsForUser(userId: number): Observable<MentorProgram[]> {
    return this.http.get<MentorProgram[]>(`${this.apiUrl}/getMentorProgramsForUser/${userId}`);
  }
  getUserById(id:number){
    return this.http.get<MentorProgram>('http://localhost:8081/api/v1/admin'+'/'+id)
  }
}
