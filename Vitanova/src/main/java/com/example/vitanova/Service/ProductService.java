package com.example.vitanova.Service;


import com.example.vitanova.Entities.Category;
import com.example.vitanova.Entities.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
    Product getProductById(Long IdProduct);
    Product getProductByName(String nameProd);
    List<Product> getProductsByCategory(Category categorie);

    Product createProduct(Product product);
    Product updateProduct(Long IdProduct, Product updatedProduct);
    void deleteProduct(Long IdProduct);
}
