package com.example.vitanova.Service;

import com.example.vitanova.Entities.Exercice;
import com.example.vitanova.Repositorie.ExerciceRepositorie;
<<<<<<< HEAD
=======
import lombok.AllArgsConstructor;
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
<<<<<<< HEAD
public class ExerciceServiceImpl implements ExerciceService {
=======
@AllArgsConstructor
public class ExerciceServiceImpl implements ExerciceService{
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
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
