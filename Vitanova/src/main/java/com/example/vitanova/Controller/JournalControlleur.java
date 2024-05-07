package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Journal;
import com.example.vitanova.Entities.MentorExercice;
import com.example.vitanova.Entities.PersonalObjectif;
import com.example.vitanova.Service.JournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/Journal")
@RequiredArgsConstructor
@CrossOrigin("*")
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

    @PostMapping("/createPo")
    public PersonalObjectif createPersonalObjectif(
            @RequestBody PersonalObjectif personalObjectif) {
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

    @PostMapping("/assign-to-journal/{personalObjectifId}/{journalId}")
    public ResponseEntity<String> assignPersonalObjectifToJournal(
            @PathVariable Long personalObjectifId,
            @PathVariable Long journalId) {

        journalService.assignPersonalObjectifToJournal(personalObjectifId, journalId);
        return ResponseEntity.ok("Personal Objective assigned to Journal successfully");
    }

    @GetMapping("/findJournalByReflexion")
    public List<Journal> findJournalByReflexion(@RequestParam String reflexion) {
        return journalService.findJournalByReflexion(reflexion);
    }
    @GetMapping("/getPOForJournal/{journalId}")
    public Set<PersonalObjectif> getPoForJournal(@PathVariable Long journalId) {
        return journalService.getPoForJournal(journalId);
    }
//    @PostMapping("/sendProgramUpdateNotification")
//    public ResponseEntity<String> sendProgramUpdateNotification(@RequestParam String userEmail) {
//        try {
//            journalService.sendProgramUpdateNotification(userEmail);
//            return ResponseEntity.ok("Program update notification email sent successfully to: " + userEmail);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Failed to send program update notification email to: " + userEmail);
//        }
//    }
// Endpoint to count personal objectives that are Done
    @GetMapping("/countPersonalObjectifsDone")
    public long countPersonalObjectifsDone() {
        return journalService.countPersonalObjectifsDone();
    }

    // Endpoint to count personal objectives that are UnDone
    @GetMapping("/countPersonalObjectifsUnDone")
    public long countPersonalObjectifsUnDone() {
        return journalService.countPersonalObjectifsUnDone();
    }


}

