import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { PersonalObjectif } from '../model/PersonalObjectif';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PoService {

  constructor(private http:HttpClient) { }
  apiUrl: string = `http://localhost:8081/Journal`;
  ApiUrl = 'YOUR_CALENDAR_API_ENDPOINT'; // Update with your calendar API endpoint
  getAllPo(): Observable<PersonalObjectif[]>{
    return this.http.get<PersonalObjectif[]>('http://localhost:8081/Journal/getAllPersonalObjectifs')
  }
  getAllPoApi(): Observable<PersonalObjectif[]> {
    return this.http.get<PersonalObjectif[]>(`${this.apiUrl}/personalobjectifs`);
  }

  getPoById(id:number){
    return this.http.get<PersonalObjectif>('http://localhost:8081/Journal/getPersonalObjectifById'+'/'+id)
  }
  createPo(po:PersonalObjectif){
    return this.http.post('http://localhost:8081/Journal/createPo',po)
  }
  createPoAndAssignToJournal(po: PersonalObjectif, journalId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Journal/createPo`, po).pipe(
      mergeMap((createdPo: PersonalObjectif) => {
        return this.assignPoToJournal(createdPo.idPerOb, journalId);
      })
    );
  }
  deletePo(id:number){
    return this.http.delete('http://localhost:8081/Journal/deletePersonalObjectif'+'/'+id)
  }
  updatePo(po:PersonalObjectif,id:number){
    return this.http.put('http://localhost:8081/Journal/updatePersonalObjectif'+'/'+id,po)
  }
  assignPoToJournal(poId: number, journalId: number): Observable<void> {  
    const url = `${this.apiUrl}/assign-to-journal/${poId}/${journalId}`;
    return this.http.post<void>(url, {});
  }     
}
