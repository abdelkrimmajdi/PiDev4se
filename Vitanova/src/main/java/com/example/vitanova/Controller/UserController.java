package com.example.vitanova.Controller;

import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Entities.RendezVous;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Service.NutritionisteServiceImpl;
import com.example.vitanova.Service.RendezVousService;
import com.example.vitanova.Service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    private RendezVousService rendezVousService;

    @PostMapping("/rendezvous/save")
    public ResponseEntity<RendezVous> saveRendezVous(@RequestBody RendezVous rendezVous, @RequestParam Long userId, @RequestParam Long nutritionistId) {
        RendezVous savedRendezVous = rendezVousService.saveRendezVous(rendezVous, userId, nutritionistId);
        return new ResponseEntity<>(savedRendezVous, HttpStatus.CREATED);
    }
    @GetMapping("/rendezvous/get/{id}")
    public ResponseEntity<RendezVous> getRendezVousById(@PathVariable Long id) {
        RendezVous rendezVous = rendezVousService.getRendezVousById(id);
        if (rendezVous != null) {
            return new ResponseEntity<>(rendezVous, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/rendezvous/all")
    public ResponseEntity<List<RendezVous>> getAllRendezVous() {
        List<RendezVous> rendezVousList = rendezVousService.getAllRendezVous();
        return new ResponseEntity<>(rendezVousList, HttpStatus.OK);
    }

    @DeleteMapping("/rendezvous/delete/{id}")
    public ResponseEntity<Void> deleteRendezVous(@PathVariable Long id) {
        rendezVousService.deleteRendezVous(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/availableHours")
    public List<String> getAvailableHours(@RequestParam String dateTime, @RequestParam Long nutritionistId) {
        return rendezVousService.getAvailableHoursForDateAndNutritionist(dateTime, nutritionistId);
    }
    @PutMapping("/updatePassword/{idUser}/{password}")
    public User updatePassword(@PathVariable Long idUser, @PathVariable String  password) {
        return userService.updatePassword(idUser, password);
    }
}

