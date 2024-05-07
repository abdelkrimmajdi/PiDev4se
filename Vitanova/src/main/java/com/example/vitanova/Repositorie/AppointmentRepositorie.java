package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Appointment;
import com.example.vitanova.Entities.Physiotherapist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vitanova.Entities.AvailableDay;
import com.example.vitanova.Entities.AvailableTime;

@Repository
public interface AppointmentRepositorie extends JpaRepository<Appointment, Long> {
    boolean existsByPhysiotherapistAndDayAppAndTimeApp(Physiotherapist physiotherapist, AvailableDay dayApp, AvailableTime timeApp);

}
