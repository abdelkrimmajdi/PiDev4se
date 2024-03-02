package com.example.vitanova.Service;

import com.example.vitanova.Entities.MentorExercice;
import com.example.vitanova.Entities.MentorProgram;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.MentorExerciceRepository;
import com.example.vitanova.Repositorie.MentorProgramRepository;
import com.example.vitanova.Repositorie.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MentorServiceImpl implements MentorService{
    @Autowired
    private MentorProgramRepository mentorProgramRepository;
    @Autowired
    private MentorExerciceRepository mentorExerciceRepository;
    @Autowired
    private UserRepository UserRepository;
    @Override
    public MentorProgram createMentorProgram(MentorProgram mentorProgram) {
        return mentorProgramRepository.save(mentorProgram);
    }
    @Override
    public Set<MentorProgram> getAllMentorPrograms() {
        return new HashSet<>(mentorProgramRepository.findAll());
    }
    @Override
    public Set<MentorProgram> getMentorProgramById(Long id) {
        Optional<MentorProgram> mentorProgramOptional = mentorProgramRepository.findById(id);
        return mentorProgramOptional.map(Set::of).orElseGet(Set::of);
    }
    @Override
    public MentorProgram updateMentorProgram(Long id, MentorProgram mentorProgram) {
        mentorProgram.setIdMentorProg(id);
        return mentorProgramRepository.save(mentorProgram);
    }
    @Override
    public void deleteMentorProgram(Long id) {
        mentorProgramRepository.deleteById(id);
    }

    @Override
    public MentorExercice createMentorExercice(MentorExercice mentorExercice) {
        return mentorExerciceRepository.save(mentorExercice);
    }
    @Override
    public Set<MentorExercice> getAllMentorExercices() {
        return new HashSet<>(mentorExerciceRepository.findAll());
    }
    @Override
    public Set<MentorExercice> getMentorExerciceById(Long id) {
        Optional<MentorExercice> mentorExerciceOptional = mentorExerciceRepository.findById(id);
        return mentorExerciceOptional.map(Set::of).orElseGet(Set::of);
    }
    @Override
    public MentorExercice updateMentorExercice(Long id,MentorExercice mentorExercice) {
        mentorExercice.setIdExercice(id);
        return mentorExerciceRepository.save(mentorExercice);
    }
    @Override
    public void deleteMentorExercice(Long id) {
        mentorExerciceRepository.deleteById(id);
    }
    @Override
    public void assignExerciceToProgram(Long exerciceId, Long programmeId) {
        MentorExercice exercice = mentorExerciceRepository.findById(exerciceId).
                orElseThrow(() -> new RuntimeException("Exercice not found for this id :: " + exerciceId));
        MentorProgram programme = mentorProgramRepository.findById(programmeId).
                orElseThrow(() -> new RuntimeException("Programme not found for this id :: " + programmeId));
        if (exercice != null && programme != null) {
            programme.getMentorexercices().add(exercice);
            mentorProgramRepository.save(programme);
        }
    }
    @Override
    public void assignProgramToUser(Long userId, Long programmeId) {
        User user = UserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found for this id :: " + userId));

        MentorProgram programme = mentorProgramRepository.findById(programmeId)
                .orElseThrow(() -> new RuntimeException("Programme not found for this id :: " + programmeId));
        if (programme != null) {
            user.getMentorprograms().add(programme);
            UserRepository.save(user);
        }
    }


    @Override
    public List<MentorProgram> searchProgramsByName(String name) {
        return mentorProgramRepository.findMentorProgramByByName(name);

    }
    @Override
    public List<MentorExercice> searchExercisesByName(String name) {
        return mentorExerciceRepository.findMentorExerciceByByName(name);
    }








}

