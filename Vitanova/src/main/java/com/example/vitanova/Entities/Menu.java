package com.example.vitanova.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdMenu;
    private int Calories;
    private String Meal;
    private String day;
    private String repas;
    @JsonIgnore
    @ManyToOne
    private NutrisionistProgram nutrisionistprogram;
}
