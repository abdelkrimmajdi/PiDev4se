package com.example.vitanova.Service;

import com.example.vitanova.Entities.Meal;

import java.util.List;

public interface MealService {
    List<Meal> getAllMeals();
    Meal getMealById(Long id);
    Meal createMeal(Meal meal);
    Meal updateMeal(Long id, Meal meal);
    void deleteMeal(Long id);
    Meal getMealByName(String name);

}
