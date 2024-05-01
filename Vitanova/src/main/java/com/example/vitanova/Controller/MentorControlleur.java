package com.example.vitanova.Controller;

import com.example.vitanova.Entities.MentorExercice;
import com.example.vitanova.Entities.MentorProgram;
import com.example.vitanova.Service.MentorService;
<<<<<<< HEAD
import lombok.RequiredArgsConstructor;
=======
import lombok.AllArgsConstructor;
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
<<<<<<< HEAD
@RequestMapping("/Mentor")
@RequiredArgsConstructor
@CrossOrigin("*")
=======
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/Mentor")
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
public class MentorControlleur {

    private final MentorService mentorService;

    @PostMapping("/createMentorProgram")
    @ResponseStatus(HttpStatus.CREATED)
    public MentorProgram createMentorProgram(@RequestBody MentorProgram mentorProgram) {
        return mentorService.createMentorProgram(mentorProgram);
    }

    @GetMapping("/getAllMentorPrograms")
    public Set<MentorProgram> getAllMentorPrograms() {
        return mentorService.getAllMentorPrograms();
    }

    @GetMapping("/getMentorProgramById/{id}")
    public Set<MentorProgram> getMentorProgramById(@PathVariable Long id) {
        return mentorService.getMentorProgramById(id);
    }

    @PutMapping("/updateMentorProgram/{id}")
    public MentorProgram updateMentorProgram(@RequestBody MentorProgram mentorProgram, @PathVariable Long id) {
        return mentorService.updateMentorProgram(id, mentorProgram);
    }

    @DeleteMapping("/deleteMentorProgram/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMentorProgram(@PathVariable Long id) {
        mentorService.deleteMentorProgram(id);
    }

    @PostMapping("/createMentorExercice")
    @ResponseStatus(HttpStatus.CREATED)
    public MentorExercice createMentorExercice(@RequestBody MentorExercice mentorExercice) {
        return mentorService.createMentorExercice(mentorExercice);
    }

    @GetMapping("/getAllMentorExercices")
    public Set<MentorExercice> getAllMentorExercices() {
        return mentorService.getAllMentorExercices();
    }

    @GetMapping("/getMentorExerciceById/{id}")
    public Set<MentorExercice> getMentorExerciceById(@PathVariable Long id) {
        return mentorService.getMentorExerciceById(id);
    }
    @GetMapping("/getMentorExercisesForProgram/{programId}")
    public Set<MentorExercice> getMentorExercisesForProgram(@PathVariable Long programId) {
        return mentorService.getMentorExercisesForProgram(programId);
    }
    @GetMapping("/getMentorProgramsForUser/{userId}")
    public Set<MentorProgram> getMentorProgramsForUser(@PathVariable Long userId) {
        return mentorService.getMentorProgramsForUser(userId);
    }

    @PutMapping("/updateMentorExercice/{id}")
    public MentorExercice updateMentorExercice(@RequestBody MentorExercice mentorExercice, @PathVariable Long id) {
        return mentorService.updateMentorExercice(id, mentorExercice);
    }

    @DeleteMapping("/deleteMentorExercice/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMentorExercice(@PathVariable Long id) {
        mentorService.deleteMentorExercice(id);
    }

    @PostMapping("/assignExerciceToProgram/{exerciceId}/{programmeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void assignExerciceToProgram(@PathVariable Long exerciceId, @PathVariable Long programmeId) {
        mentorService.assignExerciceToProgram(exerciceId, programmeId);
    }

    @PostMapping("/assignProgramToUser/{userId}/{programmeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void assignProgramToUser(@PathVariable Long userId, @PathVariable Long programmeId) {
        mentorService.assignProgramToUser(userId, programmeId);
    }

    @GetMapping("/searchPrograms/{name}")
    public List<MentorProgram> searchProgramsByName(@PathVariable String name) {
        return mentorService.searchProgramsByName(name);
    }

    @GetMapping("/searchExercises/{name}")
    public List<MentorExercice> searchExercisesByName(@PathVariable String name) {
        return mentorService.searchExercisesByName(name);
    }
    @GetMapping("/generatePDF/{id}")
    public ResponseEntity<byte[]> generatePDF(@PathVariable Long id) {
        byte[] pdfBytes = mentorService.generatePDFForMentorProgramDetails(id);
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .body(pdfBytes);
    }
}

