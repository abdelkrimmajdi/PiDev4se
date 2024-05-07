package com.example.vitanova.Service;

import com.example.vitanova.Entities.Journal;
import com.example.vitanova.Entities.PersonalObjectif;

import java.util.List;
import java.util.Set;

public interface JournalService {
    Journal createJournal(Journal journal);
    Set<Journal> getJournalById(Long id);
    Set<Journal> getAllJournals();
    Journal updateJournal(Long id, Journal journal);
    void deleteJournal(Long id);
    PersonalObjectif createPersonalObjectif(PersonalObjectif personalObjectif);

    Set<PersonalObjectif> getPersonalObjectifById(Long id);
    Set<PersonalObjectif> getAllPersonalObjectifs();
    PersonalObjectif updatePersonalObjectif(Long id, PersonalObjectif personalObjectif);
    void deletePersonalObjectif(Long id);


    void assignPersonalObjectifToJournal(Long personalObjectifId, Long journalId);

    List<Journal> findJournalByReflexion(String name);

    Set<PersonalObjectif> getPoForJournal(Long journalId);

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
    long countPersonalObjectifsDone();

    long countPersonalObjectifsUnDone();

//    void sendProgramUpdateNotification(String userEmail);
}
