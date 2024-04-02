package com.example.vitanova.Service;

import com.example.vitanova.Entities.Cart;

import java.util.List;
import java.util.Optional;

public interface CartServiceImpl {
    List<Cart> getAllCarts();
    Optional<Cart> getCartById(Long IdCard);
    Cart saveCart(Cart IdCard);
    void deleteCart(Long IdCard);
}