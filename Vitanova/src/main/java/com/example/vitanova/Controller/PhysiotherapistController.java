package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Physiotherapist;
import com.example.vitanova.Service.PhysiotherapistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/physiotherapists")
public class PhysiotherapistController {
    @Autowired
    private PhysiotherapistService physiotherapistService;

    @GetMapping
    public List<Physiotherapist> getAllPhysiotherapists() {
        return physiotherapistService.getAllPhysiotherapists();
    }

    @GetMapping("/{id}")
    public Physiotherapist getPhysiotherapistById(@PathVariable Long id) {
        return physiotherapistService.getPhysiotherapistById(id);
    }

    @PostMapping
    public Physiotherapist createPhysiotherapist(@RequestBody Physiotherapist physiotherapist) {
        return physiotherapistService.createPhysiotherapist(physiotherapist);
    }

    @PutMapping("/{id}")
    public Physiotherapist updatePhysiotherapist(@PathVariable Long id, @RequestBody Physiotherapist physiotherapist) {
        return physiotherapistService.updatePhysiotherapist(id, physiotherapist);
    }

    @DeleteMapping("/{id}")
    public void deletePhysiotherapist(@PathVariable Long id) {
        physiotherapistService.deletePhysiotherapist(id);
    }
}
