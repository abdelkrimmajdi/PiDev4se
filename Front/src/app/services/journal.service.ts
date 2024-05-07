import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Journal } from '../model/Journal';
import { Observable } from 'rxjs';
import { PersonalObjectif } from '../model/PersonalObjectif';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http:HttpClient) { }
  apiUrl: string = `http://localhost:8081/Journal`;
  getAllJournals(): Observable<Journal[]>{
    return this.http.get<Journal[]>('http://localhost:8081/Journal/getAllJournals')
  }

  getJournalById(id:number){
    return this.http.get<Journal>('http://localhost:8081/Journal/getJournalById'+'/'+id)
  }
  createJournal(j:Journal){
    return this.http.post('http://localhost:8081/Journal/createJournal',j)
  }
  deleteJournal(id:number){
    return this.http.delete('http://localhost:8081/Journal/deleteJournal'+'/'+id)
  }
  updateJournal(j:Journal,id:number){
    return this.http.put('http://localhost:8081/Journal/updateJournal'+'/'+id,j)
  }
  findJournalByReflexion(reflexion: string): Observable<Journal[]> {
    return this.http.get<Journal[]>(`${this.apiUrl}/findJournalByReflexion`, {
      params: { reflexion } // Pass reflexion as query parameter
    });
  }
  getPOForJournal(id: number): Observable<PersonalObjectif[]> {
    return this.http.get<PersonalObjectif[]>(`${this.apiUrl}/getPOForJournal/${id}`);
  }
  sendProgramUpdateNotification(userEmail: string): Observable<any> {
    const url = `${this.apiUrl}/sendProgramUpdateNotification`;
    return this.http.post(url, null, {
      params: { userEmail }
    });
  }
  countPersonalObjectifsDone(): Observable<number> {
    const url = `http://localhost:8081/Journal/countPersonalObjectifsDone`;
    return this.http.get<number>(url);
  }
  countPersonalObjectifsUnDone(): Observable<number> {
    const url = `http://localhost:8081/Journal/countPersonalObjectifsUnDone`;
    return this.http.get<number>(url);
  }
}
