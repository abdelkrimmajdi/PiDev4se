package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Meal;
import com.example.vitanova.Service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/meals")
public class MealController {
    @Autowired
    private MealService mealService;
    // Chemin absolu vers le dossier de stockage des images
    private static final String IMAGE_DIRECTORY = "C:/Users/majdiabdelkrim/Desktop/Pi/PiDev4se/Front/src/assets/restaurant";
    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> uploadMealImage(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        try {
            // Vérifiez si le fichier est vide
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Le fichier est vide.");
            }

            Meal meal = mealService.getMealById(id);
            if (meal == null) {
                return ResponseEntity.notFound().build(); // Si le repas n'existe pas
            }

            // Utiliser un nom de fichier unique pour éviter les conflits
            String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(IMAGE_DIRECTORY, uniqueFileName);

            // Écrire le fichier sur le système de fichiers
            Files.write(filePath, file.getBytes());

            // Mettre à jour le repas avec le nom du fichier image
            meal.setImageName(uniqueFileName);
            mealService.updateMeal(id, meal);

            return ResponseEntity.ok("Image téléchargée avec succès.");

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors du téléchargement de l'image: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Meal>> getAllMeals() {
        List<Meal> meals = mealService.getAllMeals();
        return new ResponseEntity<>(meals, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable Long id) {
        Meal meal = mealService.getMealById(id);
        return new ResponseEntity<>(meal, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Meal> createMeal(@RequestBody Meal meal) {
        Meal createdMeal = mealService.createMeal(meal);
        return new ResponseEntity<>(createdMeal, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meal> updateMeal(@PathVariable Long id, @RequestBody Meal meal) {
        Meal updatedMeal = mealService.updateMeal(id, meal);
        return new ResponseEntity<>(updatedMeal, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Meal> getMealByName(@PathVariable String name) {
        Meal meal = mealService.getMealByName(name);
        return new ResponseEntity<>(meal, HttpStatus.OK);
    }
}