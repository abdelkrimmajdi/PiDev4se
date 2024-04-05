package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepositorie extends JpaRepository<Subscription, Long> {
}
