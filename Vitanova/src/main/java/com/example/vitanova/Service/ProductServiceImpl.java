package com.example.vitanova.Service;

import com.example.vitanova.Entities.Category;
import com.example.vitanova.Entities.Product;
import com.example.vitanova.Repositorie.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository ProductRepository;

    @Override
    public List<Product> getAllProducts() {
        return ProductRepository.findAll();
    }

    @Override
    public Product getProductById(Long IdProduct) {
        Optional<Product> optionalProduct = ProductRepository.findById(IdProduct);
        return optionalProduct.orElse(null);
    }

    @Override
    public Product getProductByName(String nameProd) {
        return com.example.vitanova.Repositorie.ProductRepository.findByName(nameProd);
    }

    @Override
    public List<Product> getProductsByCategory(Category category) {
        return ProductRepository.findByCategorie(category);
    }

    @Override
    public Product createProduct(Product product) {
        return ProductRepository.save(product);
    }

    @Override
    public Product updateProduct(Long IdProduct, Product updatedProduct) {
        Optional<Product> optionalProduct = ProductRepository.findById(IdProduct);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setNameProd(updatedProduct.getNameProd());
            existingProduct.setPriceProd(updatedProduct.getPriceProd());
            existingProduct.setImageProd(updatedProduct.getImageProd());
            existingProduct.setCategorie(updatedProduct.getCategorie());
            return ProductRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    public void deleteProduct(Long IdProduct) {
        ProductRepository.deleteById(IdProduct);
    }



}


