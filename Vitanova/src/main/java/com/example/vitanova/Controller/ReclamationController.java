package com.example.vitanova.Controller;

<<<<<<< HEAD

import com.example.vitanova.Entities.Reclamation;
import com.example.vitanova.Service.ReclamationService;

=======
import com.example.vitanova.Entities.Reclamation;
import com.example.vitanova.Service.ReclamationService;
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
<<<<<<< HEAD
@CrossOrigin("*")
=======

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
@RestController
@RequestMapping("/api/reclamations")
public class ReclamationController {
    @Autowired
    private ReclamationService reclamationService;

    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }

    @GetMapping("/{id}")
    public Reclamation getReclamationById(@PathVariable Long id) {
        return reclamationService.getReclamationById(id);
    }

    @PostMapping
    public Reclamation createReclamation(@RequestBody Reclamation reclamation) {
        return reclamationService.createReclamation(reclamation);
    }

    @PutMapping("/{id}")
    public Reclamation updateReclamation(@PathVariable Long id, @RequestBody Reclamation reclamation) {
        return reclamationService.updateReclamation(id, reclamation);
    }

    @DeleteMapping("/{id}")
    public void deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
    }
}
