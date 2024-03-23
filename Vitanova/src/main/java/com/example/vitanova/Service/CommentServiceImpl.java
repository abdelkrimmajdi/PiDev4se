package com.example.vitanova.Service;

import com.example.vitanova.Entities.Comment;
import com.example.vitanova.Repositorie.CommentRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepositorie commentRepository;

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment getCommentById(Long id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        return optionalComment.orElse(null);
    }

    @Override
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(Long id, Comment comment) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment existingComment = optionalComment.get();
            existingComment.setDescriptionComment(comment.getDescriptionComment());
            existingComment.setDateComment(comment.getDateComment());
            existingComment.setPost(comment.getPost());
            existingComment.setResponseComments(comment.getResponseComments());
            return commentRepository.save(existingComment);
        } else {
            return null;
        }
    }

    @Override
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
