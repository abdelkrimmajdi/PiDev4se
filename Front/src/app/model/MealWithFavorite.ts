import { Meal } from './Meal.model';

export interface MealWithFavorite {
  meal: Meal;
  isFavorite: boolean;
}
