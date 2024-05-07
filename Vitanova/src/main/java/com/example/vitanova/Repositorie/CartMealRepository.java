package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.CartMeal;
import com.example.vitanova.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartMealRepository extends JpaRepository<CartMeal, Long> {
    CartMeal findByUser(User user); // Trouver le panier d'un utilisateur
}
