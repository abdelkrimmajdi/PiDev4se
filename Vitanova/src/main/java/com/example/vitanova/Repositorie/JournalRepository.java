package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {
    @Query("SELECT e FROM Journal e WHERE e.reflexion LIKE CONCAT(?1, '%')")
    List<Journal> findJournalByReflexion(String name);
}
