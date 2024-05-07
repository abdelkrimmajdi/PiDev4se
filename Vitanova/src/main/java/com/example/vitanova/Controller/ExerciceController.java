package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Exercice;
import com.example.vitanova.Service.ExerciceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/exercices")
public class ExerciceController {
    @Autowired
    private ExerciceServiceImpl exerciceService;

    private final Path fileStorageLocation = Paths.get("C:\\Users\\majdiabdelkrim\\Desktop\\Pi\\PiDev4se\\Front\\src\\assets\\img exercices");

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

    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/downloadFile/")
                    .path(fileName)
                    .toUriString();

            Exercice exercice = exerciceService.getExerciceById(id).orElseThrow(() -> new RuntimeException("Exercice not found"));
            exercice.setPicture(fileDownloadUri);
            exerciceService.createExercice(exercice);

            return ResponseEntity.ok().body(targetLocation.toString());
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not store file " + fileName + ". Please try again!");
        }
    }
}