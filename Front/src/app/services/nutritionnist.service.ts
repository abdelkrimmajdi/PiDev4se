import { Injectable } from '@angular/core';
import { NutrionnistProgram } from '../model/NutrionnistProgram';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionnistService {

  constructor(private http:HttpClient ) {}
  getAllProgramm(): Observable<NutrionnistProgram[]> {

    return this.http.get<NutrionnistProgram[]>(`http://localhost:8081/nutrisionistPrograms`);
  }

 

  createProgramm(NutrionnistProgram: NutrionnistProgram){
    
    return this.http.post(`http://localhost:8081/addProgram`,NutrionnistProgram);
  }
  deleteProgramm(idProgram: number) {
    return this.http.delete('http://localhost:8081/DeleteProgram' + '/' + idProgram);
  }
  getNutrisionistProgramsByUserId(userId: number): Observable<NutrionnistProgram[]> {
    return this.http.get<NutrionnistProgram[]>(`http://localhost:8081/user/${userId}/nutrisionistPrograms`);
  }
  saveNutrisionistProgram(nutrisionistProgram: NutrionnistProgram, userId: number): Observable<NutrionnistProgram> {
    return this.http.post<NutrionnistProgram>(`http://localhost:8081/save?userId=${userId}`, nutrisionistProgram);
  }
  getAllNutritionnists(): Observable<any> { 
    return this.http.get(`http://localhost:8081/api/v1/user/nutritionists`);
  }
  affectNutritionistProgramsToUser(userId: number, programId: number): Observable<any> {
    const url = `http://localhost:8081/api/v1/user/nutritionist-programs?userId=${userId}&programId=${programId}`;
    return this.http.post<any>(url, null);
 
  }
  getProgramsByUserId(userId: number): Observable<NutrionnistProgram[]> {
    return this.http.get<NutrionnistProgram[]>(`http://localhost:8081/api/v1/user/user/${userId}/nutrisionistPrograms`);
  }
  

}
