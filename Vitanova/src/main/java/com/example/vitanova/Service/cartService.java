package com.example.vitanova.Service;

import com.example.vitanova.Entities.Cart;
import com.example.vitanova.Repositorie.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class cartService {

    private final com.example.vitanova.Repositorie.CartRepository CartRepository;

    @Autowired
    public cartService(CartRepository CartRepository) {
        this.CartRepository = CartRepository;
    }

    public List<Cart> getAllCarts() {
        return CartRepository.findAll();
    }

    public Optional<Cart> getCartById(Long IdCard) {
        return CartRepository.findById(IdCard);
    }

    public Cart saveCart(Cart cart) {
        return CartRepository.save(cart);
    }

    public void deleteCart(Long IdCard) {
        CartRepository.deleteById(IdCard);
    }
}