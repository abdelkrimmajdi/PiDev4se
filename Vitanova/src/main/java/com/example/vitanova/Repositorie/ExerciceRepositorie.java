package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Exercice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciceRepositorie extends JpaRepository<Exercice, Long> {
    @Query("SELECT e FROM Exercice e WHERE e.NameExer LIKE CONCAT(?1, '%')")
    List<Exercice> findByName(String name);
}
