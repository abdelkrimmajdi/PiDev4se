package com.example.vitanova.Service;

import com.example.vitanova.Entities.NutrisionistProgram;

import java.util.List;
import java.util.Set;

public interface NutritionisteService {
    public List<NutrisionistProgram> getAllNutrisionistPrograms();
    public NutrisionistProgram getNutrisionistProgramById(Long id);
    public NutrisionistProgram saveNutrisionistProgram(NutrisionistProgram nutrisionistProgram);
    public void deleteNutrisionistProgram(Long id);
    public List<NutrisionistProgram> getProgramsByUserId(Long userId);
    public NutrisionistProgram affectNutritionistProgramsToUser( Long programId,Long userId);
    public NutrisionistProgram create(NutrisionistProgram nutrisionistProgram, Long userId);
    public  List<NutrisionistProgram> getUserProgramById(Long id);
}
