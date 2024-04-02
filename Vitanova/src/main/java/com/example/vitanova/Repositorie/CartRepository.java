package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
}
