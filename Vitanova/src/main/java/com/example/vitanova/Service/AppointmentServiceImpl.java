package com.example.vitanova.Service;

import com.example.vitanova.Dto.AppointmentDTO;
import com.example.vitanova.Entities.Appointment;
import com.example.vitanova.Entities.AvailableTime;
import com.example.vitanova.Entities.Physiotherapist;
import com.example.vitanova.Repositorie.AppointmentRepositorie;
import com.example.vitanova.Repositorie.PhysiotherapistRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.vitanova.Entities.AvailableDay;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private PhysiotherapistRepositorie physiotherapistRepository;

    @Autowired
    private AppointmentRepositorie appointmentRepository;
    @Override
    public List<AppointmentDTO> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        List<AppointmentDTO> appointmentDTOs = new ArrayList<>();

        for (Appointment appointment : appointments) {
            AppointmentDTO appointmentDTO = new AppointmentDTO();
            appointmentDTO.setId(appointment.getId());
            appointmentDTO.setPhysiotherapistId(appointment.getPhysiotherapist().getId());
            appointmentDTO.setDayApp(appointment.getDayApp());
            appointmentDTO.setTimeApp(appointment.getTimeApp());
            appointmentDTOs.add(appointmentDTO);
        }

        return appointmentDTOs;
    }

    @Override
    @Transactional
    public Appointment createAppointment(Long physiotherapistId, Appointment appointment) throws Exception {
        // Récupérer le physiothérapeute correspondant à partir de l'ID
        Physiotherapist physiotherapist = physiotherapistRepository.findById(physiotherapistId).get();
       System.out.println ("Physiotherapist not found"+physiotherapistId);
        // Vérifier s'il existe déjà un rendez-vous similaire
        boolean appointmentExists = appointmentRepository.existsByPhysiotherapistAndDayAppAndTimeApp(
                physiotherapist, appointment.getDayApp(), appointment.getTimeApp());

        if (appointmentExists) {
            throw new Exception("Similar appointment already exists");
        }
        // Créer le rendez-vous en associant le physiothérapeute

        appointment.setPhysiotherapist(physiotherapist);
        // Définir d'autres détails du rendez-vous à partir de appointmentRequest

        // Enregistrer le rendez-vous
        return appointmentRepository.save(appointment);
    }

    @Override
    @Transactional
    public Appointment updateAppointment(Long idApp, Appointment appointment) throws Exception {
        // Vérifier si le rendez-vous existe
        Appointment existingAppointment = appointmentRepository.findById(idApp)
                .orElseThrow(() -> new Exception("Appointment not found"));

        // Mettre à jour les détails du rendez-vous
        existingAppointment.setDayApp(appointment.getDayApp());
        existingAppointment.setTimeApp(appointment.getTimeApp());

        // Enregistrer les modifications
        return existingAppointment;
    }

    @Override
    @Transactional
    public void deleteAppointment(Long appointmentId) throws Exception {
        // Check if appointment exists
        appointmentRepository.deleteById(appointmentId);
    }

    @Override
    public Appointment findAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }
    public boolean existsByPhysiotherapistAndDayAppAndTimeApp(Physiotherapist physiotherapistId, AvailableDay dayApp, AvailableTime timeApp) {
        // Implémentez ici la logique pour vérifier si un rendez-vous similaire existe
        // Vous devrez probablement appeler la méthode correspondante du repository pour effectuer la vérification
        return appointmentRepository.existsByPhysiotherapistAndDayAppAndTimeApp(physiotherapistId, dayApp, timeApp);
    }

    // Implement additional methods based on your requirements (e.g., by physiotherapist, date range)


}
