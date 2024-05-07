package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.CouponMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponMealRepository extends JpaRepository<CouponMeal, Long> {
    CouponMeal findByName(String name); // Trouver un coupon par son nom
}
