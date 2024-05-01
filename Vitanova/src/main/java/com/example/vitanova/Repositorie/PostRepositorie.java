package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PostRepositorie extends JpaRepository<Post, Long> {
}
