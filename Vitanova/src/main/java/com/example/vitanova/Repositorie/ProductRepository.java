package com.example.vitanova.Repositorie;

<<<<<<< HEAD
import com.example.vitanova.Entities.Category;
import com.example.vitanova.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Locale;
=======
import com.example.vitanova.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {

<<<<<<< HEAD
    static Product findByName(String nameProd) {
        return null;
    }

    List<Product> findByCategorie(Category categorie);
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}
