import { Meal } from "./Meal.model";
import { User } from "./user.model";

export interface CartMeal {
    id: number;
    user: User;
    meals: Meal[];
    mealsWithQuantities: Map<Meal, number>; // Les repas dans le panier avec leurs quantités
    totalPrice: number; // Le prix total du panier
  }