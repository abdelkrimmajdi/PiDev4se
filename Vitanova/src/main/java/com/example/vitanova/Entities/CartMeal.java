package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartMeal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    User user; // L'utilisateur qui possède le panier

    @ElementCollection
    @MapKeyJoinColumn(name = "meal_id")
    @Column(name = "quantity")
    Map<Meal, Integer> mealsWithQuantities = new HashMap<>();

    public double getTotalPrice() {
        return mealsWithQuantities.entrySet().stream()
                .mapToDouble(entry -> entry.getKey().getPriceMeal() * entry.getValue())
                .sum();
    }

    // Classe interne pour les détails des repas
    @Data
    @AllArgsConstructor
    public static class CartMealDetail {
        private String mealName;   // Nom du repas
        private int mealPrice;     // Prix du repas
        private int quantity;      // Quantité dans le panier

    }

    // Méthode pour obtenir les détails des repas dans le panier
    public List<CartMealDetail> getCartMealDetails() {
        return mealsWithQuantities.entrySet().stream()
                .map(entry -> new CartMealDetail(
                        entry.getKey().getNameMeal(),
                        entry.getKey().getPriceMeal(),
                        entry.getValue()

                ))
                .collect(Collectors.toList());
    }
}
