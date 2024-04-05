package com.example.vitanova.Repositorie;


import com.example.vitanova.Entities.Demande;
import com.example.vitanova.Entities.Event;
import com.example.vitanova.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeRepository extends JpaRepository<Demande,Long> {

    @Query("SELECT d FROM Demande d WHERE d.user = :user AND d.event = :event")
    Demande findByUserAndEvent(@Param("user") User user, @Param("event") Event event);

    @Query(value =" Select appuser_id from demande  where event_id=:ide", nativeQuery = true)
    public List<Long> jibuser(@Param("ide") Long ide);

    @Query(value =" Select etat , appuser_id , event_id  from demande  where appuser_id=:id", nativeQuery = true)
    public List<Demande> dem(@Param("id") Long id);

    List <Demande> findByEvent (Event event);
}
