package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutSessionRepositorie extends JpaRepository<WorkoutSession, Long> {
}
