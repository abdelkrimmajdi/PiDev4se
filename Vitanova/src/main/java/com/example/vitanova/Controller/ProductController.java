package com.example.vitanova.Controller;

<<<<<<< HEAD
import com.example.vitanova.Entities.Category;
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import com.example.vitanova.Entities.Product;
import com.example.vitanova.Service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService ProductService;

    @GetMapping
    public List<Product> getAllProducts() {
        return ProductService.getAllProducts();
    }

    @GetMapping("/{IdProduct}")
    public ResponseEntity<Product> getProductById(@PathVariable Long IdProduct) {
        Product product = ProductService.getProductById(IdProduct);
        return ResponseEntity.ok(product);
    }


<<<<<<< HEAD
    @GetMapping("/nameProd/{nameProd}")
    public Product getProductByName(@PathVariable String nameProd) {
        return ProductService.getProductByName(nameProd);
    }

=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = ProductService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @PutMapping("/{IdProduct}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long IdProduct, @RequestBody Product updatedProduct) {
        Product product = ProductService.updateProduct(IdProduct, updatedProduct);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{IdProduct}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long IdProduct) {
        ProductService.deleteProduct(IdProduct);
        return ResponseEntity.noContent().build();
    }

<<<<<<< HEAD
    @GetMapping("/productsByCategory/{prodCategory}")
    public List<Product> getProductsByCategory(@PathVariable("prodCategory") String prodCategory) {
        if(Category.accessoire.toString().equals(prodCategory)){
            return ProductService.getProductsByCategory(Category.accessoire);
        } else if(Category.clothes.toString().equals(prodCategory)){
            return ProductService.getProductsByCategory(Category.clothes);
        } else if(Category.protein.toString().equals(prodCategory)){
            return ProductService.getProductsByCategory(Category.protein);
        } else if(Category.proteinBars.toString().equals(prodCategory)){
            return ProductService.getProductsByCategory(Category.proteinBars);
        } else {
            return null;
        }
    }

=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a

}