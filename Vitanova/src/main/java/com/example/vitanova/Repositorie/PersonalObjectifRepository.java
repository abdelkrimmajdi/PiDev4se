package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.PersonalObjectif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalObjectifRepository  extends JpaRepository<PersonalObjectif,Long> {
}
