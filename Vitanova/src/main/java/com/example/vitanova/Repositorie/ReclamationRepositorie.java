package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReclamationRepositorie extends JpaRepository<Reclamation, Long> {
}
