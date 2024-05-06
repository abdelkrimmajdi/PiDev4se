import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../model/Menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuserviceService {

  constructor(private http:HttpClient ) {}

  deleteMenu(id: number) {
    return this.http.delete('http://localhost:8081/deleteMenu' + '/' + id);
  }

  saveMenu(menu: Menu, NutritionnisteProgram: number): Observable<Menu> {
    return this.http.post<Menu>(`http://localhost:8081/SaveMenu?NutritionnisteProgram=${NutritionnisteProgram}`, menu);
  }
 
  getMenuByProgram(NutritionnisteProgram: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`http://localhost:8081/Program/${NutritionnisteProgram}/Menu`);
  }
  calculateCalories(foodName: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8081/food/${foodName}`);
  }
  calculateCaloriesOfFoods(foodNames: string[]): Observable<{ [key: string]: number }> {
    return this.http.post<{ [key: string]: number }>(`  http://localhost:8081/foods`, foodNames);
  }
 }
