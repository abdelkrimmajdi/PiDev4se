package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.MentorProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorProgramRepository extends JpaRepository<MentorProgram, Long> {
    @Query("SELECT e FROM MentorProgram e WHERE e.name LIKE CONCAT(?1, '%')")
    List<MentorProgram> findMentorProgramByByName(String name);

}
