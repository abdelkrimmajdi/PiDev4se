package com.example.vitanova.Controller;

import com.example.vitanova.Entities.MentorProgram;
<<<<<<< HEAD
import com.example.vitanova.Entities.Role;
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import com.example.vitanova.Entities.User;
import com.example.vitanova.Service.AuthenticationService;
import com.example.vitanova.Service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AuthenticationService authenticationService;
    @Autowired
    private UserServiceImpl userService;
<<<<<<< HEAD

    @PutMapping("/updateuser")
    public User updateuser(@RequestBody User user) {
        return userService.updateUser(user);
    }
    @GetMapping("/getall")
    public List<User> getAllUser() {
        return this.userService.getAllUser();
    }
    @DeleteMapping("/delete/{iduser}")
    public void deleteuser(@PathVariable Long iduser) {
        userService.deleteUser(iduser);
    }
    @PutMapping("/updatePassword/{idUser}/{password}")
    public User updatePassword(@PathVariable Long idUser, @PathVariable String  password) {
        return userService.updatePassword(idUser, password);
    }
    @GetMapping("/{idUser}")
    public User getUserById(@PathVariable Long idUser) {
        return userService.getUserById(idUser);
    }
    @PutMapping("/{userId}")
    public User updateUserRole(@PathVariable Long userId, @RequestParam Role newRole) {
        return userService.updateUserRole(userId, newRole);
    }

}
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a

    @PutMapping("/updateuser")
    public User updateuser(@RequestBody User user) {
        return userService.updateUser(user);
    }
    @GetMapping("/getall")
    public List<User> getAllUser() {
        return this.userService.getAllUser();
    }
    @DeleteMapping("/delete/{iduser}")
    public void deleteuser(@PathVariable Long iduser) {
        userService.deleteUser(iduser);
    }

}
