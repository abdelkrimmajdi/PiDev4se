package com.example.vitanova.Service;

import com.example.vitanova.Entities.MentorExercice;
import com.example.vitanova.Entities.MentorProgram;

import java.util.List;
import java.util.Set;

public interface MentorService {
    public MentorProgram createMentorProgram(MentorProgram mentorProgram);
    public Set<MentorProgram> getAllMentorPrograms();
    public Set<MentorProgram> getMentorProgramById(Long id);
    public MentorProgram updateMentorProgram(Long id,MentorProgram mentorProgram);
    public void deleteMentorProgram(Long id);
    public MentorExercice createMentorExercice(MentorExercice mentorExercice);
    public Set<MentorExercice> getAllMentorExercices();
    public Set<MentorExercice> getMentorExerciceById(Long id);
    public MentorExercice updateMentorExercice(Long id, MentorExercice mentorExercice);
    public void deleteMentorExercice(Long id);
    public void assignExerciceToProgram(Long exerciceId, Long programmeId);
    public void assignProgramToUser(Long userId, Long programmeId);
    public List<MentorProgram> searchProgramsByName(String name);
    public List<MentorExercice> searchExercisesByName(String name);
}
