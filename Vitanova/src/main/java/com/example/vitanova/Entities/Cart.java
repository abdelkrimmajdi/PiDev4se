package com.example.vitanova.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdCard;
    private int quantity;
    private int price;
    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "idProduct")
    private Product product;

}