package com.example.vitanova.Service;

import com.example.vitanova.Entities.CartMeal;

public interface CartMealService {
    // Obtenir le panier par l'ID de l'utilisateur
    CartMeal getCartByUserId(Long userId);

    // Ajouter un repas au panier
    CartMeal addMealToCart(Long userId, Long mealId, int quantity);
    double getTotalPriceByUserId(Long userId); // Méthode pour obtenir le prix total
    CartMeal removeMealByDetail(Long userId, String mealName); // Ajout de la méthode pour retirer un repas
    CartMeal updateMealQuantity(Long userId, String mealName, int newQuantity);

}
