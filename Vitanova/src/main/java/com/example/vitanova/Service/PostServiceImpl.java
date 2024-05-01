package com.example.vitanova.Service;

import com.example.vitanova.Entities.Post;
import com.example.vitanova.Repositorie.PostRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService{
    @Autowired
    private PostRepositorie postRepository;

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        return optionalPost.orElse(null);
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Long id, Post post) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post existingPost = optionalPost.get();
            existingPost.setDescriptionPost(post.getDescriptionPost());
            existingPost.setDatePost(post.getDatePost());
            existingPost.setUser(post.getUser());
            existingPost.setLikes(post.getLikes());
            existingPost.setComments(post.getComments());
            return postRepository.save(existingPost);
        } else {
            return null;
        }
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
