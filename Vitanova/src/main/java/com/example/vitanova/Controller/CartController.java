package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Cart;
import com.example.vitanova.Entities.Product;
import com.example.vitanova.Service.CartServiceImpl;
import com.example.vitanova.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartServiceImpl cartService;
    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }


    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart createdCart = cartService.saveCart(cart);
        return ResponseEntity.ok(createdCart);
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("cartId") Long cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.noContent().build();
    }

}
