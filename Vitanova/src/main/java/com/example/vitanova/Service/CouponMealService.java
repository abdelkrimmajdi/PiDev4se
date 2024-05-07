package com.example.vitanova.Service;

import com.example.vitanova.Entities.CouponMeal;
import java.util.List;

public interface CouponMealService {
    CouponMeal createCoupon(CouponMeal coupon); // Créer un coupon
    CouponMeal getCouponById(Long id); // Récupérer un coupon par son ID
    CouponMeal findByName(String name); // Récupérer un coupon par son nom
    List<CouponMeal> getAllCoupons(); // Obtenir tous les coupons
    CouponMeal updateCoupon(Long id, CouponMeal coupon); // Mettre à jour un coupon
    void deleteCoupon(Long id); // Supprimer un coupon
    boolean isCouponValid(String name, double cartTotalPrice); // Vérifier si un coupon est valide
    double applyCoupon(String name, double cartTotalPrice); // Applique le coupon au prix total
}
