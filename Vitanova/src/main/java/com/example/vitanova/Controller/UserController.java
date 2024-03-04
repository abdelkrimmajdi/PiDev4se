package com.example.vitanova.Controller;

import com.example.vitanova.Entities.User;
import com.example.vitanova.Service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    UserServiceImpl userService;
    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hi User");
    }
    @PutMapping("/update")
    public User updateEtudiant(@RequestBody User etudiant) {
        return userService.updateUser(etudiant);
    }
}

