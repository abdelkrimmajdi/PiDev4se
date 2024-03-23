package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepositorie extends JpaRepository<Response, Long> {
}
