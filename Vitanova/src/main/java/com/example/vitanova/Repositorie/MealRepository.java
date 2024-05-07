package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MealRepository extends JpaRepository<Meal,Long> {
    Optional<Meal> findByNameMeal(String name);

}
