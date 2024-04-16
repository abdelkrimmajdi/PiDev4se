package com.example.vitanova.Service;

import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Repositorie.NutrisionisteProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NutritionisteServiceImpl implements NutritionisteService{
    @Autowired
    private NutrisionisteProgramRepository repository;
    public List<NutrisionistProgram> getAllNutrisionistPrograms() {
        return repository.findAll();
    }

    public NutrisionistProgram getNutrisionistProgramById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public NutrisionistProgram saveNutrisionistProgram(NutrisionistProgram nutrisionistProgram) {
        return repository.save(nutrisionistProgram);
    }

    public void deleteNutrisionistProgram(Long id) {
        repository.deleteById(id);
    }

}
