package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdArticle;
    private int quantityArt;
    @ManyToOne(cascade = CascadeType.ALL)
    Cart cart;
    @ManyToOne
    Delivery delivery;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Product> Products;
}
