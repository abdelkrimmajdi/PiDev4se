package com.example.vitanova.Controller;

import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Service.NutritionisteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/nutrisionistPrograms")
public class NutrionisteProgramController {
    @Autowired
    private NutritionisteService service;

    @GetMapping("/")
    public List<NutrisionistProgram> getAllNutrisionistPrograms() {
        return service.getAllNutrisionistPrograms();
    }

    @GetMapping("/{id}")
    public NutrisionistProgram getNutrisionistProgramById(@PathVariable Long id) {
        return service.getNutrisionistProgramById(id);
    }

    @PostMapping("/")
    public NutrisionistProgram saveNutrisionistProgram(@RequestBody NutrisionistProgram nutrisionistProgram) {
        return service.saveNutrisionistProgram(nutrisionistProgram);
    }

    @DeleteMapping("/{id}")
    public void deleteNutrisionistProgram(@PathVariable Long id) {
        service.deleteNutrisionistProgram(id);
    }
}
