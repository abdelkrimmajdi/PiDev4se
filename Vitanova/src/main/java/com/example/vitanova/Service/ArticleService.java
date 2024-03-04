package com.example.vitanova.Service;
import com.example.vitanova.Entities.Article;

import java.util.List;
public interface ArticleService {


    List<Article> getAllArticles();
    Article getArticleById(Long IdArticle);
    Article createArticle(Article article);
    Article updateArticle(Long IdArticle, Article updatedArticle);
    void deleteArticle(Long IdArticle);
}