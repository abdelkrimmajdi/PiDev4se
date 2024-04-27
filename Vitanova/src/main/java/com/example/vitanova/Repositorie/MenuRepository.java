package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Menu;
import com.example.vitanova.Entities.NutrisionistProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Query("SELECT m FROM Menu m WHERE m.nutrisionistprogram.IdNutrisionistProgram = :programId")
    List<Menu> findByNutrisionistProgramId(@Param("programId") Long programId);

}
