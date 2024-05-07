package com.example.vitanova.Service;

import com.example.vitanova.Entities.CouponMeal;
import com.example.vitanova.Repositorie.CouponMealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponMealServiceImpl implements CouponMealService {
    private final CouponMealRepository couponMealRepository;

    @Override
    public CouponMeal createCoupon(CouponMeal coupon) {
        return couponMealRepository.save(coupon);
    }

    @Override
    public CouponMeal getCouponById(Long id) {
        return couponMealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));
    }

    @Override
    public CouponMeal findByName(String name) {
        return couponMealRepository.findByName(name);
    }

    @Override
    public List<CouponMeal> getAllCoupons() {
        return couponMealRepository.findAll();
    }

    @Override
    public CouponMeal updateCoupon(Long id, CouponMeal coupon) {
        CouponMeal existingCoupon = getCouponById(id);
        existingCoupon.setName(coupon.getName());
        existingCoupon.setDiscountPercentage(coupon.getDiscountPercentage());
        existingCoupon.setMinTotalPrice(coupon.getMinTotalPrice());
        existingCoupon.setMaxTotalPrice(coupon.getMaxTotalPrice());
        existingCoupon.setExpiryDate(coupon.getExpiryDate());
        return couponMealRepository.save(existingCoupon);
    }

    @Override
    public void deleteCoupon(Long id) {
        couponMealRepository.deleteById(id);
    }

    @Override
    public boolean isCouponValid(String name, double cartTotalPrice) {
        CouponMeal coupon = findByName(name);
        if (coupon == null || coupon.getExpiryDate().isBefore(LocalDate.now())) {
            return false; // Le coupon est invalide ou expiré
        }
        return cartTotalPrice >= coupon.getMinTotalPrice() && cartTotalPrice <= coupon.getMaxTotalPrice();
    }

    @Override
    public double applyCoupon(String name, double cartTotalPrice) {
        if (isCouponValid(name, cartTotalPrice)) {
            CouponMeal coupon = findByName(name);
            double discountAmount = cartTotalPrice * (coupon.getDiscountPercentage() / 100.0); // Calcule la réduction
            return cartTotalPrice - discountAmount; // Applique la réduction
        }
        return cartTotalPrice; // Si le coupon n'est pas valide, retournez le prix total sans réduction
    }

}
