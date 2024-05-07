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
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdDelivery;
    private String name;
    private String email;
    private int phone;
    private String adresse;
    private String city;
    private String country;
    private double total;
    @ManyToOne
    User user;
    @OneToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "IdCard")
    private Cart cart;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="delivery")
    private Set<Article> Article;

}