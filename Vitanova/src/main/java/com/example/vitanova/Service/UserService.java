package com.example.vitanova.Service;

import com.example.vitanova.Entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();
<<<<<<< HEAD
    List<User> getAllUser();
    public User updatePassword (Long idUser, String password);
    public User updateUser(User user);
=======
    public List<User> getAllUser();
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}
