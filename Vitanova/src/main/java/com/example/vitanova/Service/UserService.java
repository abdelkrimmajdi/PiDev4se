package com.example.vitanova.Service;

import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Set;

public interface UserService {
    UserDetailsService userDetailsService();
    List<User> getAllUser();
    public User updatePassword (Long idUser, String password);
    public User updateUser(User user);
    public List<User> getAllNutritionists();

}
