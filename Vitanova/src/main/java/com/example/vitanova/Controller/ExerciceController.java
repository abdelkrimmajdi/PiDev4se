package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Exercice;
import com.example.vitanova.Service.ExerciceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/exercices")
public class ExerciceController {
    @Autowired
    private ExerciceServiceImpl exerciceService;

    @GetMapping
    public List<Exercice> getAllExercices() {
        return exerciceService.getAllExercices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercice> getExerciceById(@PathVariable Long id) {
        Optional<Exercice> exercice = exerciceService.getExerciceById(id);
        return exercice.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public Exercice createExercice(@RequestBody Exercice exercice) {
        return exerciceService.createExercice(exercice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercice> updateExercice(@PathVariable Long id, @RequestBody Exercice updatedExercice) {
        Exercice exercice = exerciceService.updateExercice(id, updatedExercice);
        return new ResponseEntity<>(exercice, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercice(@PathVariable Long id) {
        exerciceService.deleteExercice(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/name/{name}")
    public List<Exercice> getExercicesByName(@PathVariable String name) {
        return exerciceService.findByName(name);
    }

}