package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Meal;
import com.example.vitanova.Service.MealService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/meals")
public class MealController {
    @Autowired
    private MealService mealService;

    @GetMapping
    public List<Meal> getAllMeals() {
        return mealService.getAllMeals();
    }

    @GetMapping("/{id}")
    public Meal getMealById(@PathVariable Long id) {
        return mealService.getMealById(id);
    }

    @PostMapping
    public Meal createMeal(@RequestBody Meal meal) {
        return mealService.createMeal(meal);
    }

    @PutMapping("/{id}")
    public Meal updateMeal(@PathVariable Long id, @RequestBody Meal meal) {
        return mealService.updateMeal(id, meal);
    }

    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
    }
    @GetMapping("/byname/{name}")
    public ResponseEntity<Meal> getMealByName(@PathVariable String name) {
        Meal meal = mealService.getMealByName(name);
        if (meal != null) {
            return new ResponseEntity<>(meal, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
