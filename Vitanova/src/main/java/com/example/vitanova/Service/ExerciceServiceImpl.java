package com.example.vitanova.Service;

import com.example.vitanova.Entities.Exercice;
import com.example.vitanova.Repositorie.ExerciceRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciceServiceImpl implements ExerciceService {
    @Autowired
    private ExerciceRepositorie exerciceRepositorie;

    @Override
    public List<Exercice> getAllExercices() {
        return exerciceRepositorie.findAll();
    }

    @Override
    public Optional<Exercice> getExerciceById(Long id) {
        return exerciceRepositorie.findById(id);
    }

    @Override
    public Exercice createExercice(Exercice exercice) {
        return exerciceRepositorie.save(exercice);
    }

    @Override
    public Exercice updateExercice(Long id, Exercice updatedExercice) {
        updatedExercice.setIdExer(id);
        return exerciceRepositorie.save(updatedExercice);
    }

    @Override
    public void deleteExercice(Long id) {
        exerciceRepositorie.deleteById(id);
    }

    public List<Exercice> findByName(String name) {
        return exerciceRepositorie.findByName(name);
    }
}
