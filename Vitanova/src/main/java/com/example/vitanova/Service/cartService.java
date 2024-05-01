package com.example.vitanova.Service;

import com.example.vitanova.Entities.Cart;
<<<<<<< HEAD
import com.example.vitanova.Entities.Product;
import com.example.vitanova.Repositorie.CartRepository;
import com.example.vitanova.Repositorie.ProductRepository;
import lombok.RequiredArgsConstructor;
=======
import com.example.vitanova.Repositorie.CartRepository;
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
<<<<<<< HEAD
@RequiredArgsConstructor
public class cartService implements CartServiceImpl{

    private final CartRepository CartRepository;
    private final ProductRepository productRepository;

    @Override
    public List<Cart> getAllCarts() {
        return CartRepository.findAll();
    }
    @Override
    public Optional<Cart> getCartById(Long IdCard) {
        return CartRepository.findById(IdCard);
    }
    @Override
    public Cart saveCart(Cart cart) {
        CartRepository.save(cart);
        if(cart.getProduct() != null) {
          Optional <Product> optionalProduct = productRepository.findById(cart.getProduct().getIdProduct());
            if(optionalProduct.isPresent()) {
                Product product = optionalProduct.get();
                product.setCart(cart);
                productRepository.save(product);
            }
        }
         return cart;
    }
    @Override
    public void deleteCart(Long IdCard) {
        Optional<Cart> optionalcart = CartRepository.findById(IdCard);
        if(optionalcart.isPresent()) {
            Cart cart = optionalcart.get();
            if(cart.getProduct() != null) {
                Optional<Product> optionalProduct = productRepository.findById(cart.getProduct().getIdProduct());
                if (optionalProduct.isPresent()) {
                    Product product = optionalProduct.get();
                    product.setCart(null);
                    productRepository.save(product);
                }
            }
            CartRepository.delete(cart);
        }
=======
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
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
    }
}