package com.example.vitanova.Service;

import com.example.vitanova.Entities.Exercice;

import java.util.List;
import java.util.Optional;

public interface ExerciceService {
    List<Exercice> getAllExercices();
    Optional<Exercice> getExerciceById(Long id);
    Exercice createExercice(Exercice exercice);
    Exercice updateExercice(Long id, Exercice updatedExercice);
    void deleteExercice(Long id);
}
