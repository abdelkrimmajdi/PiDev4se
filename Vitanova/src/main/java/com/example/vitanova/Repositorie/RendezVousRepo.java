package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Reclamation;
import com.example.vitanova.Entities.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RendezVousRepo  extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findByDateTimeAndNutritionistId(String dateTime, Long nutritionistId);
    List<RendezVous> findByNutritionistId(Long nutritionistId);
}
