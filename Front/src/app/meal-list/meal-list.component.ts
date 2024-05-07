import { Component, OnInit } from '@angular/core';
import { Meal } from '../model/Meal.model';
import { User } from '../model/user.model';
import { CartmealService } from '../services/cartmeal.service';
import { FavoriteMealService } from '../services/favorite-meal.service';
import { MealServiceService } from '../services/meal-service.service';



@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  meals: { meal: Meal, quantity: number }[] = [];
  filteredMeals: { meal: Meal, quantity: number }[] = [];
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);
  searchTerm: string = ''; // Terme de recherche par nom
  minPrice: number | null = null; // Prix minimum (null signifie aucune limite inférieure)
  maxPrice: number | null = null; // Prix maximum (null signifie aucune limite supérieure)
  selectedCategory: string = ''; // Catégorie sélectionnée (chaîne vide signifie toutes catégories)
  uniqueCategories: string[] = []; // Liste des catégories uniques

  constructor(
    private mealService: MealServiceService,
    private cartMealService: CartmealService,
    private favoriteMealService: FavoriteMealService // Injecter le service des favoris

  ) {}

  ngOnInit(): void {
    this.loadMeals(); // Charger les repas au démarrage
  }

  loadMeals(): void {
    this.mealService.getAllMeals().subscribe({
      next: (data) => {
        this.meals = data.map((meal) => ({
          meal,
          quantity: 1,
        }));

        // Extraire les catégories uniques
        this.uniqueCategories = Array.from(
          new Set(this.meals.map((item) => item.meal.categoryMeal))
        );

        this.filteredMeals = [...this.meals]; // Initialiser avec tous les repas
      },
      error: (err) => {
        console.error('Erreur lors du chargement des repas', err);
      },
    });
  }

  addMealToCart(meal: Meal, quantity: number): void {
    this.cartMealService.addMealToCart(this.userconnect.id, meal.idMeal, quantity).subscribe({
      next: (cart) => {
        console.log('Meal ajouté au panier', cart); // Afficher le résultat
      },
      error: (err) => {
        console.error('Erreur lors de lajout au panier', err); // Gestion des erreurs
      },
    });
  }

  filterMeals(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase(); // Recherche insensible à la casse

    this.filteredMeals = this.meals.filter((item) => {
      // Condition de nom
      const mealNameMatches = item.meal.nameMeal.toLowerCase().includes(lowerCaseSearchTerm);

      // Conditions de prix
      const priceMatches = (this.minPrice === null || item.meal.priceMeal >= (this.minPrice || 0))
        && (this.maxPrice === null || item.meal.priceMeal <= (this.maxPrice || Infinity));

      // Condition de catégorie
      const categoryMatches = this.selectedCategory === ''
        || item.meal.categoryMeal === this.selectedCategory;

      return mealNameMatches && priceMatches && categoryMatches; // Vérifier toutes les conditions
    });
  }
  addMealToFavorites(meal: Meal): void {
    this.favoriteMealService.addFavorite(this.userconnect.id, meal.idMeal).subscribe({
      next: (favorite) => {
        console.log('Meal ajouté aux favoris', favorite);
      },
      error: (err) => {
        console.error('Erreur lors de lajout aux favoris', err);
      },
    });
  
  }
  
}
