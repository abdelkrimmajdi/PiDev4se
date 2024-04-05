
package com.example.vitanova.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.util.Locale;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdProduct;
    private String nameProd;
    private int priceProd;
    @Lob
    @Column(length = 100000)
    private byte[] imageProd;
    private Category categorie;
    @OneToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "IdCard")
    @JsonIgnore
    private Cart cart;

}