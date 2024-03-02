package com.example.vitanova.Service;

import com.example.vitanova.Entities.Journal;
import com.example.vitanova.Entities.PersonalObjectif;

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
}
