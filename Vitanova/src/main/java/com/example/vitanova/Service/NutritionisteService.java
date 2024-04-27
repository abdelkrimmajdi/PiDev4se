package com.example.vitanova.Service;

import com.example.vitanova.Entities.NutrisionistProgram;

import java.util.List;

public interface NutritionisteService {
    public List<NutrisionistProgram> getAllNutrisionistPrograms();
    public NutrisionistProgram getNutrisionistProgramById(Long id);
    public NutrisionistProgram saveNutrisionistProgram(NutrisionistProgram nutrisionistProgram);
    public void deleteNutrisionistProgram(Long id);
    public List<NutrisionistProgram> getProgramsByUserId(Long userId);
    public NutrisionistProgram create(NutrisionistProgram nutrisionistProgram, Long userId);
}
