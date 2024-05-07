package com.example.vitanova.Controller;

import com.example.vitanova.Entities.CouponMeal;
import com.example.vitanova.Service.CouponMealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/coupons")
public class CouponMealController {

    private final CouponMealService couponMealService;

    public CouponMealController(CouponMealService couponMealService) {
        this.couponMealService = couponMealService;
    }

    // Création d'un nouveau coupon
    @PostMapping
    public ResponseEntity<CouponMeal> createCoupon(@RequestBody CouponMeal coupon) {
        CouponMeal newCoupon = couponMealService.createCoupon(coupon);
        return ResponseEntity.ok(newCoupon);
    }

    // Récupération de tous les coupons
    @GetMapping
    public ResponseEntity<List<CouponMeal>> getAllCoupons() {
        List<CouponMeal> coupons = couponMealService.getAllCoupons();
        return ResponseEntity.ok(coupons);
    }

    // Récupération d'un coupon par ID
    @GetMapping("/{id}")
    public ResponseEntity<CouponMeal> getCouponById(@PathVariable Long id) {
        CouponMeal coupon = couponMealService.getCouponById(id);
        return ResponseEntity.ok(coupon);
    }

    // Mise à jour d'un coupon
    @PutMapping("/{id}")
    public ResponseEntity<CouponMeal> updateCoupon(
            @PathVariable Long id,
            @RequestBody CouponMeal updatedCoupon
    ) {
        CouponMeal coupon = couponMealService.updateCoupon(id, updatedCoupon);
        return ResponseEntity.ok(coupon);
    }

    // Suppression d'un coupon
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        couponMealService.deleteCoupon(id);
        return ResponseEntity.noContent().build();
    }

    // Appliquer un coupon pour un utilisateur avec un certain prix total
    @PostMapping("/apply")
    public ResponseEntity<Double> applyCoupon(@RequestParam String couponName, @RequestParam double cartTotalPrice) {
        double newTotal = couponMealService.applyCoupon(couponName, cartTotalPrice);
        return ResponseEntity.ok(newTotal);
    }

    // Vérifier la validité d'un coupon pour un certain prix total
    @GetMapping("/valid")
    public ResponseEntity<Boolean> isCouponValid(
            @RequestParam String name,
            @RequestParam double cartTotalPrice
    ) {
        boolean isValid = couponMealService.isCouponValid(name, cartTotalPrice);
        return ResponseEntity.ok(isValid);
    }

    @GetMapping("/byName/{name}") // Point de terminaison pour récupérer un coupon par nom
    public ResponseEntity<CouponMeal> getCouponByName(@PathVariable String name) {
        CouponMeal coupon = couponMealService.findByName(name);

        if (coupon == null) {
            return ResponseEntity.notFound().build(); // Si le coupon n'est pas trouvé, retourner 404
        }

        return ResponseEntity.ok(coupon); // Sinon, retourner le coupon trouvé
    }
}

