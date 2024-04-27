package com.example.vitanova.Controller;

import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Service.NutritionisteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin("*")

public class NutrionisteProgramController {
    @Autowired
    private NutritionisteService service;

    @GetMapping("/nutrisionistPrograms")
    public List<NutrisionistProgram> getAllNutrisionistPrograms() {
        return service.getAllNutrisionistPrograms();
    }

    @GetMapping("/{id}")
    public NutrisionistProgram getNutrisionistProgramById(@PathVariable Long id) {
        return service.getNutrisionistProgramById(id);
    }

    @PostMapping("/addProgram")
    public NutrisionistProgram saveNutrisionistProgram(@RequestBody NutrisionistProgram nutrisionistProgram) {
        return service.saveNutrisionistProgram(nutrisionistProgram);
    }
    @PostMapping("/save")
    public NutrisionistProgram saveNutrisionistProgram(@RequestBody NutrisionistProgram nutrisionistProgram, @RequestParam Long userId) {
        NutrisionistProgram savedProgram = service.create(nutrisionistProgram, userId);
        return savedProgram;
    }

    @DeleteMapping("/{id}")
    public void deleteNutrisionistProgram(@PathVariable Long id) {
        service.deleteNutrisionistProgram(id);
    }
    @GetMapping("/user/{userId}/nutrisionistPrograms")
    public List<NutrisionistProgram> getNutrisionistProgramsByUserId(@PathVariable Long userId) {
        return service.getProgramsByUserId(userId);
    }
}