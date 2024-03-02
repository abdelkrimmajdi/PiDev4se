package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.MentorExercice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorExerciceRepository extends JpaRepository<MentorExercice, Long> {
    @Query("SELECT e FROM MentorExercice e WHERE e.name LIKE CONCAT(?1, '%')")
    List<MentorExercice> findMentorExerciceByByName(String name);
}