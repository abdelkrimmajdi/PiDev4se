import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/app/model/Meal.model';
import { MealServiceService } from 'src/app/services/meal-service.service';

@Component({
  selector: 'app-updatemeal',
  templateUrl: './updatemeal.component.html',
  styleUrls: ['./updatemeal.component.scss']
})
export class UpdateMealComponent implements OnInit {
  meal: Meal = new Meal();
  id!: number;
  errorMessage: string | null = null; // Propriété pour stocker le message d'erreur

  constructor(
    private mealService: MealServiceService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.mealService.getMealById(this.id).subscribe(
      (data) => {
        this.meal = data;
      },
      (error) => {
        console.error(error);
        this.errorMessage = "Erreur lors de la récupération du repas.";
      }
    );
  }

  Onsubmit(): void {
    this.errorMessage = null; // Réinitialisez le message d'erreur
    if (this.meal.nameMeal.length < 10 || this.meal.nameMeal.length > 150) {
      this.errorMessage = "Le nom doit avoir entre 10 et 150 caractères.";
      return; // Arrêtez la soumission
    }

    if (this.meal.priceMeal < 30 || this.meal.priceMeal > 200) {
      this.errorMessage = "Le prix doit être entre 30 et 200.";
      return; // Arrêtez la soumission
    }

    // Si aucune erreur de validation, soumettre la mise à jour
    this.mealService.updateMeal(this.id, this.meal).subscribe(
      (data) => {
        this.getAllMeals(); // Réussite
      },
      (error) => {
        console.error(error);
        this.errorMessage = "Erreur lors de la mise à jour du repas."; // Erreur lors de la soumission
      }
    );
  }

  getAllMeals(): void {
    setTimeout(() => {
      this.router.navigate(['/admin/all-meal']);
    }, 100); // Navigation vers la liste des repas
  }
}
