import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/app/model/Meal.model';
import { MealServiceService } from 'src/app/services/meal-service.service';

@Component({
  selector: 'app-createmeal',
  templateUrl: './createmeal.component.html',
  styleUrls: ['./createmeal.component.scss']
})
export class CREATEMEALComponent {
  meal: Meal = new Meal(); 
  errorMessage: string = ''; // Pour stocker les messages d'erreur
  selectedImage: File | null = null; // Pour stocker l'image sélectionnée

  constructor(
    private mealService: MealServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file; // Stocker le fichier image sélectionné
    }
  }

  addMeal() {
    this.errorMessage = '';

    // Effectuez les validations pour le nom et le prix du repas
    if (!this.meal.nameMeal) {
      this.errorMessage = 'Required Name';
      return;
    } else if (this.meal.nameMeal.length < 10 || this.meal.nameMeal.length > 150) {
      this.errorMessage = 'Name  10 & 150 ';
      return;
    }

    if (this.meal.priceMeal == null) {
      this.errorMessage = 'required price';
      return;
    } else if (this.meal.priceMeal < 30 || this.meal.priceMeal > 200) {
      this.errorMessage = 'required price 30 & 200';
      return;
    }

    // Créer le repas
    this.mealService.createMeal(this.meal).subscribe(
      (createdMeal) => {
        console.log(createdMeal);

        // Si une image a été sélectionnée, téléchargez-la
        if (this.selectedImage && createdMeal.idMeal) {
          this.mealService.uploadMealImage(createdMeal.idMeal, this.selectedImage).subscribe(
            (uploadResponse) => {
              console.log(uploadResponse);
            },
            (error) => {
              console.log('Erreur lors du téléchargement de l\'image:', error);
            }
          );
        }

        // Réinitialiser le composant après le succès
        this.meal = new Meal();
        this.selectedImage = null; // Réinitialisez le fichier image
        this.getallmeals(); // Naviguer vers la liste des repas
      },
      (error) => {
        console.log('Erreur lors de la création du repas:', error);
      }
    );
  }

  getallmeals(): void {
    setTimeout(() => {
      this.router.navigate(['/admin/all-meal']); // Navigation vers la liste des repas
    }, 100);
  }
}
