package com.example.vitanova.Service;

import com.example.vitanova.Entities.Journal;
import com.example.vitanova.Entities.PersonalObjectif;
import com.example.vitanova.Repositorie.JournalRepository;
import com.example.vitanova.Repositorie.PersonalObjectifRepository;
import com.example.vitanova.Repositorie.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
@Service
public class JournalServiceImpl implements JournalService{
    @Autowired
    private JournalRepository journalRepository;
    @Autowired
    private PersonalObjectifRepository personalObjectifRepository;
    @Autowired
    private UserRepository userRepository;

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
    public PersonalObjectif createPersonalObjectif(PersonalObjectif personalObjectif) {
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
}

