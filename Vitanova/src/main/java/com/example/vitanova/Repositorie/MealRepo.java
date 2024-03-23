package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepo extends JpaRepository <Meal,Long> {
    Meal findByNameMeal(String nameMeal);

}
