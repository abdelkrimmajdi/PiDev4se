package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Journal;
import com.example.vitanova.Entities.PersonalObjectif;
import com.example.vitanova.Service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
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
