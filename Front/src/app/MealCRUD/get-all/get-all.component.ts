import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/model/Meal.model';
import { MealServiceService } from 'src/app/services/meal-service.service';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.scss'],
})
export class GetAllComponent implements OnInit { 
  meals: Meal[] = [];
  filteredMeals: Meal[] = [];
  searchText: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  constructor(private mealService: MealServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllMeals();
  }

  getAllMeals(): void {
    this.mealService.getAllMeals().subscribe(
      (meals: Meal[]) => {
        this.meals = meals;
        this.filteredMeals = meals; // Initialiser les repas filtrés avec tous les repas
      },
      (error) => {
        console.error("Une erreur s'est produite lors de la récupération des repas:", error);
      }
    );
  }
  searchByPrice(): void {
    // Appliquer le filtre par prix
    this.filteredMeals = this.meals.filter((meal) => {
      if (this.minPrice !== null && this.maxPrice !== null) {
        // Filtrer par plage de prix
        return meal.priceMeal >= this.minPrice && meal.priceMeal <= this.maxPrice;
      }
      return true; // Si aucun critère de prix, afficher tous les repas
    });
  }
  sortMeals(property: keyof Meal, order: 'asc' | 'desc'): void {
    this.filteredMeals.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1; // Ascendant
      } else {
        return aValue < bValue ? 1 : -1; // Descendant
      }
    });
  }


  searchMeals(): void {
    if (this.searchText.trim() === '') {
      this.filteredMeals = this.meals; // Si le champ de recherche est vide, afficher tous les repas
    } else {
      const searchTextLower = this.searchText.toLowerCase();
      this.filteredMeals = this.meals.filter((meal) =>
        meal.nameMeal.toLowerCase().includes(searchTextLower)
      );
    }
  }

  Updatemeal(id: number) {
    this.router.navigate(['/admin/update-meal', id]);
  }

  DeleteMeal(id: number) {
    this.mealService.deleteMeal(id).subscribe((data) => {
      console.log(data);
      this.getAllMeals();
    });
  }

  DetailMeal(id: number) {
    this.router.navigate(['/admin/detail-meal', id]);
  }

  createmeal() {
    this.router.navigate(['/admin/create-meal']);
  }
  chartMeal() {
    this.router.navigate(['/admin/chart-meal']);
  }
}
