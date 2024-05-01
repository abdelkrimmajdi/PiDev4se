package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Journal;
import com.example.vitanova.Entities.PersonalObjectif;
import com.example.vitanova.Service.JournalService;
<<<<<<< HEAD
import lombok.RequiredArgsConstructor;
=======
import lombok.AllArgsConstructor;
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
<<<<<<< HEAD
@RequestMapping("/Journal")
@RequiredArgsConstructor
@CrossOrigin("*")
=======
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/Journal")
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
public class JournalControlleur {

    @Autowired
    private JournalService journalService;

    @PostMapping("/createJournal")
    public Journal createJournal(@RequestBody Journal journal) {
        return journalService.createJournal(journal);
    }

    @GetMapping("/getJournalById/{id}")
    public Set<Journal> getJournalById(@PathVariable Long id) {
        return journalService.getJournalById(id);
    }

    @GetMapping("/getAllJournals")
    public Set<Journal> getAllJournals() {
        return journalService.getAllJournals();
    }

    @PutMapping("/updateJournal/{id}")
    public Journal updateJournal(@PathVariable Long id, @RequestBody Journal journal) {
        return journalService.updateJournal(id, journal);
    }

    @DeleteMapping("/deleteJournal/{id}")
    public void deleteJournal(@PathVariable Long id) {
        journalService.deleteJournal(id);
    }

    // Endpoints for PersonalObjectif

    @PostMapping("/createPersonalObjectif")
    public PersonalObjectif createPersonalObjectif(@RequestBody PersonalObjectif personalObjectif) {
        return journalService.createPersonalObjectif(personalObjectif);
    }

    @GetMapping("/getPersonalObjectifById/{id}")
    public Set<PersonalObjectif> getPersonalObjectifById(@PathVariable Long id) {
        return journalService.getPersonalObjectifById(id);
    }

    @GetMapping("/getAllPersonalObjectifs")
    public Set<PersonalObjectif> getAllPersonalObjectifs() {
        return journalService.getAllPersonalObjectifs();
    }

    @PutMapping("/updatePersonalObjectif/{id}")
    public PersonalObjectif updatePersonalObjectif(@PathVariable Long id, @RequestBody PersonalObjectif personalObjectif) {
        return journalService.updatePersonalObjectif(id, personalObjectif);
    }

    @DeleteMapping("/deletePersonalObjectif/{id}")
    public void deletePersonalObjectif(@PathVariable Long id) {
        journalService.deletePersonalObjectif(id);
    }
}
