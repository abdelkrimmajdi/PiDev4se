package com.example.vitanova.Service;

import com.example.vitanova.Entities.FavoriteMeal;
import com.example.vitanova.Entities.User;

import java.util.List;

public interface FavoriteMealService {
    FavoriteMeal addFavorite(Long userId, Long mealId);

    void removeFavorite(Long userId, Long mealId);

    List<FavoriteMeal> getFavoritesByUser(User user);
}
