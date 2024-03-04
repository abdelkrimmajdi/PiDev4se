package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article,Long> {
}
