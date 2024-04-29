import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../model/Menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuserviceService {

  constructor(private http:HttpClient ) {}

 

  saveMenu(menu: Menu, NutritionnisteProgram: number): Observable<Menu> {
    return this.http.post<Menu>(`http://localhost:8081/SaveMenu?NutritionnisteProgram=${NutritionnisteProgram}`, menu);
  }
 
  getMenuByProgram(NutritionnisteProgram: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`http://localhost:8081/Program/${NutritionnisteProgram}/Menu`);
  }
 }
