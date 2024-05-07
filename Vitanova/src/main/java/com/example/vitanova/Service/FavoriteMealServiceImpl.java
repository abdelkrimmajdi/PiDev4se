package com.example.vitanova.Service;

import com.example.vitanova.Entities.FavoriteMeal;
import com.example.vitanova.Entities.Meal;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.FavoriteMealRepository;
import com.example.vitanova.Repositorie.MealRepository;
import com.example.vitanova.Repositorie.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteMealServiceImpl implements FavoriteMealService {
    private final FavoriteMealRepository favoriteMealRepository;
    private final UserRepository userRepository;
    private final MealRepository mealRepository;

    @Override
    public FavoriteMeal addFavorite(Long userId, Long mealId) {
        // Récupérer l'utilisateur et le repas
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new RuntimeException("Meal not found"));

        // Vérifier si le repas est déjà dans les favoris de l'utilisateur
        Optional<FavoriteMeal> existingFavorite = favoriteMealRepository.findByUserAndMeal(user, meal);
        if (existingFavorite.isPresent()) {
            // Si le repas est déjà dans les favoris, lancer une exception ou retourner un message d'erreur
            throw new RuntimeException("meal found on favoris");
        }

        // Créer le nouvel objet FavoriteMeal
        FavoriteMeal favoriteMeal = FavoriteMeal.builder()
                .user(user)
                .meal(meal)
                .build();

        // Sauvegarder le nouveau favori dans la base de données
        return favoriteMealRepository.save(favoriteMeal);
    }

    @Override
    public void removeFavorite(Long userId, Long mealId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new RuntimeException("Meal not found"));

        FavoriteMeal favoriteMeal = favoriteMealRepository.findByUserAndMeal(user, meal) // Correction
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        favoriteMealRepository.delete(favoriteMeal);
    }

    @Override
    public List<FavoriteMeal> getFavoritesByUser(User user) {
        return favoriteMealRepository.findByUser(user);
    }}
