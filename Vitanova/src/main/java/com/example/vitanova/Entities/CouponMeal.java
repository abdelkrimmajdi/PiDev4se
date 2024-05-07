package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponMeal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name; // Nom du coupon
    double discountPercentage; // Pourcentage de réduction
    double minTotalPrice; // Prix total minimum pour appliquer le coupon
    double maxTotalPrice; // Prix total maximum pour appliquer le coupon
    LocalDate expiryDate; // Date d'expiration
}
