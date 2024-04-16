package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.NutrisionistProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutrisionisteProgramRepository extends JpaRepository<NutrisionistProgram,Long> {
}
