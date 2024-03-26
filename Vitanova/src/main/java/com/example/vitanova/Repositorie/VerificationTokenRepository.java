package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface VerificationTokenRepository extends JpaRepository<VerificationToken,Long> {
    VerificationToken findByToken(String token);
    void deleteByUser(com.example.vitanova.Entities.User user);
    List<VerificationToken> findByUser(com.example.vitanova.Entities.User user);
}
