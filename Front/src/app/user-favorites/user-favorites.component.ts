import { Component, OnInit } from '@angular/core';
import { FavoriteMeal } from '../model/FavoriteMeal';
import { User } from '../model/user.model';
import { FavoriteMealService } from '../services/favorite-meal.service';


@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css']
})
export class UserFavoritesComponent implements OnInit {
  favorites: FavoriteMeal[] = [];
  isLoading: boolean = true; // Indicateur de chargement

  constructor(private favoriteMealService: FavoriteMealService) {}

  ngOnInit(): void {
    const userConnectString = localStorage.getItem('userconnect');
    let userConnect: User | null = null;

    if (userConnectString) {
      userConnect = JSON.parse(userConnectString);

      if (userConnect && userConnect.id) {
        // Récupérer les favoris de l'utilisateur
        this.favoriteMealService.getFavoritesByUser(userConnect.id).subscribe(
          (data) => {
            this.favorites = data;
            this.isLoading = false;
          },
          (error) => {
            console.error("Erreur lors de la récupération des favoris :", error);
            this.isLoading = false;
          }
        );
      }
    }

    if (!userConnect) {
      console.warn("Aucun utilisateur connecté trouvé.");
      this.isLoading = false;
    }
  }

}
