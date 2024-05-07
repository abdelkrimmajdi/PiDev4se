package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdMeal;
    private int priceMeal;
    private String nameMeal;
    @Enumerated(EnumType.STRING)
    private CategoryMeal CategoryMeal;
    private String imageName;


}
