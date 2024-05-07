package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Article;
import com.example.vitanova.Entities.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery,Long> {
}
