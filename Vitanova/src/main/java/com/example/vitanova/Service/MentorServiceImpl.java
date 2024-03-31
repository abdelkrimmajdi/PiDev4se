package com.example.vitanova.Service;

import com.example.vitanova.Configuration.EmailSender;
import com.example.vitanova.Configuration.EmailService;
import com.example.vitanova.Entities.Mail;
import com.example.vitanova.Entities.MentorExercice;
import com.example.vitanova.Entities.MentorProgram;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.MentorExerciceRepository;
import com.example.vitanova.Repositorie.MentorProgramRepository;
import com.example.vitanova.Repositorie.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MentorServiceImpl implements MentorService{
    @Autowired
    private EmailService emailService;
    @Autowired
    EmailSender emailSender;
    @Autowired
    private MentorProgramRepository mentorProgramRepository;
    @Autowired
    private MentorExerciceRepository mentorExerciceRepository;
    @Autowired
    private UserRepository UserRepository;
    private static final Logger logger = LoggerFactory.getLogger(MentorServiceImpl.class);
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

            // Send email notification to the user
            sendProgramUpdateNotification(user.getEmail(), programme.getName());
        }
    }
    @Override
    public void sendProgramUpdateNotification(String userEmail, String programName) {
        // You can construct your email message here
        String subject = "Program Update Notification";
        String message = "Dear User,\n\nYour programs have been updated. " +
                "You have been assigned to the program: " + programName + ".\n\n" +
                "Best regards,\nThe Winners Team";

        // Send the email
        // Assuming you have an email service configured
        // You can use the existing email service or any email sending mechanism
        // Example:
        Mail mail = new Mail();
        mail.setSubject(subject);
        mail.setTo(userEmail);
        mail.setContent(message);
        emailService.sendSimpleEmailFares(mail);  // Assuming you have an email service

        // You may want to log the success or failure of email sending
        logger.info("Program update notification email sent to: {}", userEmail);
    }


    @Override
    public List<MentorProgram> searchProgramsByName(String name) {
        return mentorProgramRepository.findMentorProgramByByName(name);
    }
    @Override
    public List<MentorExercice> searchExercisesByName(String name) {
        return mentorExerciceRepository.findMentorExerciceByByName(name);
    }
    @Override
    public Set<MentorExercice> getMentorExercisesForProgram(Long programId) {
        MentorProgram program = mentorProgramRepository.findById(programId)
                .orElseThrow(() -> new RuntimeException("Mentor program not found for this id :: " + programId));
        return program.getMentorexercices();
    }







}

