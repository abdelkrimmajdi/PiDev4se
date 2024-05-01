package com.example.vitanova.Service;

import com.example.vitanova.Entities.Meal;
import com.example.vitanova.Repositorie.MealRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MealServiceImpl implements MealService {
    @Autowired
    private MealRepo mealRepository;

    @Override
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    @Override
    public Meal getMealById(Long id) {
        return mealRepository.findById(id).orElse(null);
    }

    @Override
    public Meal createMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    @Override
    public Meal updateMeal(Long id, Meal meal) {
        meal.setIdMeal(id);
        return mealRepository.save(meal);
    }

    @Override
    public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
    }

    @Override
    public Meal getMealByName(String name) {
        return mealRepository.findByNameMeal(name);
    }
}
