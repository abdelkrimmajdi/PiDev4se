package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.PersonalObjectif;
import com.example.vitanova.Entities.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface PersonalObjectifRepository  extends JpaRepository<PersonalObjectif,Long> {
//    List<PersonalObjectif> findByEndDateBetween(Date startDate, Date endDate);
    long countByStatut(State state);
}
