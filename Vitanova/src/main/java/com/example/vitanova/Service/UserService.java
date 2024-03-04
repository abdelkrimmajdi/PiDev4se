package com.example.vitanova.Service;

import com.example.vitanova.Entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();
    List<User> getAllUser();
}
