package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Role;
import com.example.vitanova.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);


    Optional<User> findByFirstName(String firstname);

    Optional<User> findByPasswordResetToken(String passwordResetToken);

    User findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.role = com.example.vitanova.Entities.Role.NUTRITIONISTE ")
    List<User> findAllNutritionists();

}