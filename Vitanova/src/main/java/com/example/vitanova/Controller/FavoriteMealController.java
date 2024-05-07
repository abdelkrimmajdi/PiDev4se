package com.example.vitanova.Controller;

import com.example.vitanova.Entities.FavoriteMeal;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Service.FavoriteMealService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor  // Gère l'injection de dépendance via le constructeur
public class FavoriteMealController {
    private final FavoriteMealService favoriteMealService; // Injection de l'interface du service

    @PostMapping("/add")
    public ResponseEntity<FavoriteMeal> addFavorite(
            @RequestParam Long userId,
            @RequestParam Long mealId
    ) {
        FavoriteMeal favorite = favoriteMealService.addFavorite(userId, mealId);
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFavorite(
            @RequestParam Long userId,
            @RequestParam Long mealId
    ) {
        favoriteMealService.removeFavorite(userId, mealId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}/favorites")
    public ResponseEntity<List<FavoriteMeal>> getFavoritesByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);

        List<FavoriteMeal> favorites = favoriteMealService.getFavoritesByUser(user);
        return ResponseEntity.ok(favorites);
    }
}
