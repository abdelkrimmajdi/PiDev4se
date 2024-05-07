package com.example.vitanova.Service;

import com.example.vitanova.Dto.AppointmentDTO;
import com.example.vitanova.Entities.Appointment;
import com.example.vitanova.Entities.AvailableDay;
import com.example.vitanova.Entities.AvailableTime;
import com.example.vitanova.Entities.Physiotherapist;

import java.util.List;

public interface AppointmentService {


    List<AppointmentDTO> getAllAppointments();

    Appointment createAppointment(Long physiotherapistId, Appointment appointment) throws Exception;

    Appointment updateAppointment(Long idApp, Appointment appointment) throws Exception;

    void deleteAppointment(Long appointmentId) throws Exception;

    Appointment findAppointmentById(Long appointmentId);
    boolean existsByPhysiotherapistAndDayAppAndTimeApp(Physiotherapist physiotherapistId, AvailableDay dayApp, AvailableTime timeApp);


    // Optional: Add other find methods based on your requirements (e.g., by physiotherapist, date range, etc.)
}
