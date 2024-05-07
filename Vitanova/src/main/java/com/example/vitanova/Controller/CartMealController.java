package com.example.vitanova.Controller;

import com.example.vitanova.Entities.CartMeal;
import com.example.vitanova.Service.CartMealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartMealController {
    private final CartMealService cartMealService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartMeal> getCartByUser(@PathVariable Long userId) {
        CartMeal cart = cartMealService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/user/{userId}/details")
    public ResponseEntity<List<CartMeal.CartMealDetail>> getCartMealDetails(@PathVariable Long userId) {
        CartMeal cart = cartMealService.getCartByUserId(userId);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }

        List<CartMeal.CartMealDetail> details = cart.getCartMealDetails();
        return ResponseEntity.ok(details);
    }

    @GetMapping("/totalprice/user/{userId}")
    public ResponseEntity<Double> getTotalPriceByUser(@PathVariable Long userId) {
        double totalPrice = cartMealService.getTotalPriceByUserId(userId);
        return ResponseEntity.ok(totalPrice);
    }

    @PostMapping("/add/{userId}/{mealId}/{quantity}")
    public ResponseEntity<CartMeal> addMealToCart(
            @PathVariable Long userId,
            @PathVariable Long mealId,
            @PathVariable int quantity
    ) {
        CartMeal cart = cartMealService.addMealToCart(userId, mealId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove-meal-by-name")
    public ResponseEntity<CartMeal> removeMealFromCartByDetail(
            @RequestParam Long userId,
            @RequestParam String mealName
    ) {
        CartMeal updatedCart = cartMealService.removeMealByDetail(userId, mealName);
        return ResponseEntity.ok(updatedCart);
    }
    @PutMapping("/update-quantity/{userId}/{mealName}")
    public ResponseEntity<CartMeal> updateMealQuantity(
            @PathVariable Long userId,
            @PathVariable String mealName,
            @RequestParam int quantity
    ) {
        CartMeal updatedCart = cartMealService.updateMealQuantity(userId, mealName, quantity);
        return ResponseEntity.ok(updatedCart);
    }
}
