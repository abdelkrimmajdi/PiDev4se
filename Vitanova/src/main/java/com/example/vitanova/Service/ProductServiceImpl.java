package com.example.vitanova.Service;

<<<<<<< HEAD
import com.example.vitanova.Entities.Category;
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
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
<<<<<<< HEAD
    public Product getProductByName(String nameProd) {
        return com.example.vitanova.Repositorie.ProductRepository.findByName(nameProd);
    }

    @Override
    public List<Product> getProductsByCategory(Category category) {
        return ProductRepository.findByCategorie(category);
    }

    @Override
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
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


