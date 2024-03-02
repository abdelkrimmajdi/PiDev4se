package com.example.vitanova.Controller;

import com.example.vitanova.Entities.MentorExercice;
import com.example.vitanova.Entities.MentorProgram;
import com.example.vitanova.Service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class MentorControlleur {

    @Autowired
    private MentorService mentorService;

    @PostMapping("/createMentorProgram")
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
        return mentorService.updateMentorProgram(id,mentorProgram);
    }

    @DeleteMapping("/deleteMentorProgram/{id}")
    public void deleteMentorProgram(@PathVariable Long id) {
        mentorService.deleteMentorProgram(id);
    }

    @PostMapping("/createMentorExercice")
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

    @PutMapping("/updateMentorExercice/{id}")
    public MentorExercice updateMentorExercice(@RequestBody MentorExercice mentorExercice, @PathVariable Long id) {
        return mentorService.updateMentorExercice(id,mentorExercice);
    }

    @DeleteMapping("/deleteMentorExercice/{id}")
    public void deleteMentorExercice(@PathVariable Long id) {
        mentorService.deleteMentorExercice(id);
    }
    @PostMapping("/assignExerciceToProgram/{exerciceId}/{programmeId}")
    public void assignExerciceToProgram(@PathVariable Long exerciceId, @PathVariable Long programmeId) {
        mentorService.assignExerciceToProgram(exerciceId, programmeId);
    }

    @PostMapping("/assignProgramToUser/{userId}/{programmeId}")
    public void assignProgramToUser(@PathVariable Long userId, @PathVariable Long programmeId) {
        mentorService.assignProgramToUser(userId, programmeId);
    }


    @GetMapping("/searchPrograms/{name}")
    public List<MentorProgram> searchProgramsByName(@PathVariable  String name) {
        return mentorService.searchProgramsByName(name);
    }

    @GetMapping("/searchExercises/{name}")
    public List<MentorExercice> searchExercisesByName(@PathVariable  String name) {
        return mentorService.searchExercisesByName(name);
    }
}
