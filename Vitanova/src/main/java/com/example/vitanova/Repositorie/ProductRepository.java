package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Category;
import com.example.vitanova.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {

    static Product findByName(String nameProd) {
        return null;
    }

    List<Product> findByCategorie(Category categorie);
}
