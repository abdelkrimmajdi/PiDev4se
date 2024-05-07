import { Meal } from "./Meal.model";

export interface FavoriteMeal {
    id: number;
    userId: number;
    mealId: number;
   mealName: string;
    meal: Meal;
  }
  