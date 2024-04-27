package com.example.vitanova.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class NutrisionistProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdNutrisionistProgram;
    private String NameProg;
    private String  Duration;
    @ManyToOne
    @JsonIgnore
    User user;

    @OneToMany
    private List<Menu>menus;
}
