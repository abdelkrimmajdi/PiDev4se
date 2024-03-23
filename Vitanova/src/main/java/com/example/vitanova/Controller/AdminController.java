package com.example.vitanova.Controller;

import com.example.vitanova.Entities.MentorProgram;
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
