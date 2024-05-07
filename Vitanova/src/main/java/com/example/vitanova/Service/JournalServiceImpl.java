package com.example.vitanova.Service;

import com.example.vitanova.Configuration.EmailSender;
import com.example.vitanova.Configuration.EmailService;
import com.example.vitanova.Entities.*;
import com.example.vitanova.Repositorie.JournalRepository;
import com.example.vitanova.Repositorie.PersonalObjectifRepository;
import com.example.vitanova.Repositorie.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class JournalServiceImpl implements JournalService{
    private static final Logger logger = LoggerFactory.getLogger(JournalServiceImpl.class);
    @Autowired
    private JournalRepository journalRepository;
    @Autowired
    private PersonalObjectifRepository personalObjectifRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    EmailSender emailSender;

    @Override
    public Journal createJournal(Journal journal) {
        return journalRepository.save(journal);
    }

    public Set<Journal> getJournalById(Long id) {
        Optional<Journal> journalOptional = journalRepository.findById(id);
        return journalOptional.map(Set::of).orElseGet(Set::of);
    }

    public Set<Journal> getAllJournals() {
        return new HashSet<>(journalRepository.findAll());
    }

    @Override
    public Journal updateJournal(Long id, Journal journal) {
        if (journalRepository.existsById(id)) {
            journal.setIdJo(id);
            return journalRepository.save(journal);
        } else {

            return null;
        }
    }

    @Override
    public void deleteJournal(Long id) {
        journalRepository.deleteById(id);
    }
    @Override
    public PersonalObjectif createPersonalObjectif(PersonalObjectif personalObjectif){
        return personalObjectifRepository.save(personalObjectif);
    }

    public Set<PersonalObjectif> getPersonalObjectifById(Long id) {
        Optional<PersonalObjectif> personalObjectifOptional = personalObjectifRepository.findById(id);
        return personalObjectifOptional.map(Set::of).orElseGet(Set::of);
    }

    public Set<PersonalObjectif> getAllPersonalObjectifs() {
        return new HashSet<>(personalObjectifRepository.findAll());
    }

    @Override
    public PersonalObjectif updatePersonalObjectif(Long id, PersonalObjectif personalObjectif) {
        if (personalObjectifRepository.existsById(id)) {
            personalObjectif.setIdPerOb(id);
            return personalObjectifRepository.save(personalObjectif);
        } else {

            return null;
        }
    }

    @Override
    public void deletePersonalObjectif(Long id) {
        personalObjectifRepository.deleteById(id);
    }
    public static LocalDate convertToLocalDate(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }
    @Override
    public void assignPersonalObjectifToJournal(Long personalObjectifId, Long journalId) {
        try {
            // Retrieve PersonalObjectif and Journal entities
            PersonalObjectif personalObjectif = personalObjectifRepository.findById(personalObjectifId)
                    .orElseThrow(() -> new RuntimeException("Personal Objective not found for ID: " + personalObjectifId));

            Journal journal = journalRepository.findById(journalId)
                    .orElseThrow(() -> new RuntimeException("Journal not found for ID: " + journalId));

            // Perform assignment logic
            if (personalObjectif != null && journal != null) {

                // Assign the personal objective to the journal
                journal.getPersonalObjectifs().add(personalObjectif);
                journalRepository.save(journal);

                logger.info("Personal Objective (ID: {}) assigned to Journal (ID: {}) successfully", personalObjectifId, journalId);
            } else {
                throw new RuntimeException("Personal Objective or Journal not found for IDs: " + personalObjectifId + ", " + journalId);
            }
        } catch (Exception e) {
            logger.error("Error assigning Personal Objective to Journal", e);
            throw new RuntimeException("Error assigning Personal Objective to Journal", e);
        }
    }


    @Override
    public List<Journal> findJournalByReflexion(String name) {
        return journalRepository.findJournalByReflexion(name);
    }
    @Override
    public Set<PersonalObjectif> getPoForJournal(Long journalId) {
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new RuntimeException("Journal not found for this id :: " + journalId));
        return journal.getPersonalObjectifs();
    }
//    @Override
//    public void sendProgramUpdateNotification(String userEmail) {
//        // Get current date and date one week from now
//        LocalDate currentDate = LocalDate.now();
//        LocalDate oneWeekLater = currentDate.plusWeeks(1);
//        // Convert LocalDate to Date
//        Date startDate = Date.from(currentDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//        Date endDate = Date.from(oneWeekLater.atStartOfDay(ZoneId.systemDefault()).toInstant());
//
//
//        // Find personal objectives that end within the next week
//        List<PersonalObjectif> duePersonalObjectifs = personalObjectifRepository.findByEndDateBetween(startDate, endDate);
//
//        if (!duePersonalObjectifs.isEmpty()) {
//            // Construct email message
//            String subject = "Personal Objectives Reminder";
//            StringBuilder message = new StringBuilder("Dear User,\n\nYou have the following personal objectives with due dates within a week:\n\n");
//
//            for (PersonalObjectif po : duePersonalObjectifs) {
//                message.append("- ").append(po.getTitle()).append(": Due on ").append(po.getEndDate()).append("\n");
//            }
//
//            message.append("\nPlease review and update your personal objectives accordingly.\n\nBest regards,\nThe Winners Team");
//
//            // Send the email
//            Mail mail = new Mail();
//            mail.setSubject(subject);
//            mail.setTo(userEmail);
//            mail.setContent(message.toString());
//
//            try {
//                emailService.sendSimpleEmailNotif(mail);
//                logger.info("Personal objectives reminder email sent to: {}", userEmail);
//            } catch (Exception e) {
//                logger.error("Failed to send personal objectives reminder email to: {}", userEmail, e);
//                // Handle email sending failure
//            }
//        }
//    }
    @Override
    public long countPersonalObjectifsDone() {
        return personalObjectifRepository.countByStatut(State.Done);
    }

    @Override
    public long countPersonalObjectifsUnDone() {
        return personalObjectifRepository.countByStatut(State.UnDone);
    }

}



