package com.example.vitanova.Service;


<<<<<<< HEAD
import com.example.vitanova.Entities.Category;
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import com.example.vitanova.Entities.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
    Product getProductById(Long IdProduct);
<<<<<<< HEAD
    Product getProductByName(String nameProd);
    List<Product> getProductsByCategory(Category categorie);

=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
    Product createProduct(Product product);
    Product updateProduct(Long IdProduct, Product updatedProduct);
    void deleteProduct(Long IdProduct);
}
