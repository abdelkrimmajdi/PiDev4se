package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Menu;
import com.example.vitanova.Service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class MenuController {
    @Autowired
    private MenuService service;

    @GetMapping("/Program/{ProgramId}/Menu")
    public List<Menu> getMenuByProgramId(@PathVariable Long ProgramId) {
        return service.getMenuByProgramId(ProgramId);
    }

    @PostMapping("/SaveMenu")
    public Menu saveMenu(@RequestBody Menu menu, @RequestParam Long NutritionnisteProgram) {
        Menu savedProgram = service.create(menu, NutritionnisteProgram);
        return savedProgram;
    }
    @DeleteMapping("deleteMenu/{id}")
    public void deleteMenu(@PathVariable Long id) {
        service.deleteMenu(id);
    }
    @GetMapping("/food/{foodName}")
    public ResponseEntity<Integer> calculateCaloriesOfFood(@PathVariable String foodName) {
        try {
            int calories = service.calculateCaloriesOfFood(foodName);
            return ResponseEntity.ok(calories);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @PostMapping("/foods")
    public ResponseEntity<Map<String, Integer>> calculateCaloriesOfFoods(@RequestBody List<String> foodNames) {
        Map<String, Integer> caloriesMap = service.calculateCaloriesOfFoods(foodNames);
        return ResponseEntity.ok(caloriesMap);
    }
}
