package com.example.vitanova.Service;

import com.example.vitanova.Entities.CartMeal;
import com.example.vitanova.Entities.Meal;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.CartMealRepository;
import com.example.vitanova.Repositorie.MealRepository;
import com.example.vitanova.Repositorie.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartMealServiceImpl implements CartMealService {
    private final CartMealRepository cartMealRepository;
    private final UserRepository userRepository;
    private final MealRepository mealRepository;

    @Override
    public CartMeal getCartByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartMealRepository.findByUser(user);
    }

    @Override
    public CartMeal addMealToCart(Long userId, Long mealId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new RuntimeException("Meal not found"));

        CartMeal cart = cartMealRepository.findByUser(user);
        if (cart == null) {
            cart = new CartMeal();
            cart.setUser(user);
            cart.setMealsWithQuantities(new HashMap<>());
        }

        // Ajoutez la logique pour gérer les quantités
        cart.getMealsWithQuantities().merge(meal, quantity, Integer::sum);

        return cartMealRepository.save(cart);
    }
    @Override
    public double getTotalPriceByUserId(Long userId) {
        CartMeal cart = getCartByUserId(userId);
        if (cart == null || cart.getMealsWithQuantities().isEmpty()) {
            return 0; // Retourne 0 si le panier n'existe pas ou est vide
        }

        // Calcule le prix total
        return cart.getTotalPrice(); // Utilise la méthode de l'entité CartMeal pour obtenir le prix total
    }
    @Override
    public CartMeal removeMealByDetail(Long userId, String mealName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CartMeal cart = cartMealRepository.findByUser(user);
        if (cart == null) {
            throw new RuntimeException("Cart not found");
        }

        // Cherchez le repas par son nom dans le panier
        Meal mealToRemove = null;
        for (Meal meal : cart.getMealsWithQuantities().keySet()) {
            if (meal.getNameMeal().equals(mealName)) {
                mealToRemove = meal;
                break;
            }
        }

        if (mealToRemove == null) {
            throw new RuntimeException("Meal not found in cart");
        }

        // Supprimez le repas du panier
        cart.getMealsWithQuantities().remove(mealToRemove);
        return cartMealRepository.save(cart);
    }

    @Override
    public CartMeal updateMealQuantity(Long userId, String mealName, int newQuantity) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        var cart = cartMealRepository.findByUser(user);
        if (cart == null) {
            throw new RuntimeException("Cart not found");
        }

        Meal mealToUpdate = cart.getMealsWithQuantities().keySet().stream()
                .filter(meal -> meal.getNameMeal().equals(mealName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Meal not found in cart"));

        if (newQuantity <= 0) {
            cart.getMealsWithQuantities().remove(mealToUpdate); // Supprimer si quantité <= 0
        } else {
            cart.getMealsWithQuantities().put(mealToUpdate, newQuantity); // Mettre à jour la quantité
        }

        cartMealRepository.save(cart); // Sauvegarder les modifications
        return cart;
    }
}

