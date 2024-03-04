package com.example.vitanova.Service;

import com.example.vitanova.Entities.Article;
import com.example.vitanova.Repositorie.ArticleRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service

public class ArticleServiceImpl implements ArticleService {

    private  ArticleRepository ArticleRepository;

    @Override
    public List<Article> getAllArticles() {
        return ArticleRepository.findAll();
    }

    @Override
    public Article getArticleById(Long IdArticle) {
        Optional<Article> optionalArticle = ArticleRepository.findById(IdArticle);
        return optionalArticle.orElse(null);
    }

    @Override
    public Article createArticle(Article article) {
        return ArticleRepository.save(article);
    }

    @Override
    public Article updateArticle(Long IdArticle, Article updatedArticle) {
        Optional<Article> optionalArticle = ArticleRepository.findById(IdArticle);
        if (optionalArticle.isPresent()) {
            Article existingArticle = optionalArticle.get();
            existingArticle.setQuantityArt(updatedArticle.getQuantityArt());
            existingArticle.setCart(updatedArticle.getCart());
            existingArticle.setDelivery(updatedArticle.getDelivery());
            existingArticle.setProducts(updatedArticle.getProducts());
            return ArticleRepository.save(existingArticle);
        }
        return null;
    }

    @Override
    public void deleteArticle(Long IdArticle) {
        ArticleRepository.deleteById(IdArticle);
    }
}

