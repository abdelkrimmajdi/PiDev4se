package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
