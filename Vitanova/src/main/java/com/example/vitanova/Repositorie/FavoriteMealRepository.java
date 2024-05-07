package com.example.vitanova.Repositorie;


import com.example.vitanova.Entities.FavoriteMeal;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Entities.Meal; // Correction
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteMealRepository extends JpaRepository<FavoriteMeal, Long> {
    Optional<FavoriteMeal> findByUserAndMeal(User user, Meal meal); // Correction
    List<FavoriteMeal> findByUser(User user); // Trouver les favoris par utilisateur
}
