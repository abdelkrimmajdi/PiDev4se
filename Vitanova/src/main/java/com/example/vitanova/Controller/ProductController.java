package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Product;
import com.example.vitanova.Service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
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

}