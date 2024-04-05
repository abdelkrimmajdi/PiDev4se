package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Demande;
import com.example.vitanova.Service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/demande")
public class DemandeController {

    private final DemandeService demandeService;

    @Autowired
    public DemandeController(DemandeService demandeService) {
        this.demandeService = demandeService;
    }

    @PostMapping("/{ide}/{idu}")
    public void demande(@RequestBody Demande demande, @PathVariable("ide") Long ide, @PathVariable("idu") Long idu) {
        demandeService.demande(demande, ide, idu);
    }

    @PostMapping("/not/{ide}/{idu}")
    public void annulerdemande(@PathVariable("ide") Long ide, @PathVariable("idu") Long idu) {
        demandeService.notgoing(ide, idu);
    }

    @PostMapping("/accept/{id}")
    public void accepter(@PathVariable("id") Long id) {
        demandeService.Accept(id);
    }

    @PostMapping("/reject/{id}")
    public void rejecter(@PathVariable("id") Long id) {
        demandeService.Refuser(id);
    }

    @DeleteMapping("/del/{ide}/{idu}")
    public void deleteDemande(@PathVariable("ide") Long ide, @PathVariable("idu") Long idu) {
        demandeService.notgoing(ide, idu);
    }

    @GetMapping(value = "/mes/{idu}")
    public Set<Demande> show(@PathVariable("idu") Long idu) {
        return demandeService.Show(idu);
    }

    @GetMapping()
    public List<Demande> show() {
        return demandeService.Show();
    }
}
