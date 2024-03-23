package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface CommentRepositorie extends JpaRepository<Comment, Long> {
}
