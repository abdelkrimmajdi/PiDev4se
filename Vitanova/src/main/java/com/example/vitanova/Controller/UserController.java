package com.example.vitanova.Controller;

import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Service.NutritionisteServiceImpl;
import com.example.vitanova.Service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    NutritionisteServiceImpl Service;

    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hi User");
    }
    @PutMapping("/update")
    public User updateEtudiant(@RequestBody User etudiant) {
        return userService.updateUser(etudiant);
    }
    @GetMapping("/nutritionists")
    public List<User> getAllNutritionists() {
        return userService.getAllNutritionists();
    }
    @PostMapping("/nutritionist-programs")
    public void affectNutritionistProgramsToUser(@RequestParam Long userId, @RequestParam Long programId) {
        Service.affectNutritionistProgramsToUser( programId,userId);
    }
    @GetMapping("/user/{userId}/nutrisionistPrograms")
    public List<NutrisionistProgram> getNutrisionistProgramsByUserId(@PathVariable Long userId) {
        return Service.getUserProgramById(userId);
    }
}

