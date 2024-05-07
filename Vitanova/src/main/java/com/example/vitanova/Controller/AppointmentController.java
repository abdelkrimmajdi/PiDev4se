package com.example.vitanova.Controller;

import com.example.vitanova.Dto.AppointmentDTO;
import com.example.vitanova.Entities.Appointment;
import com.example.vitanova.Entities.AvailableDay;
import com.example.vitanova.Entities.AvailableTime;
import com.example.vitanova.Entities.Physiotherapist;
import com.example.vitanova.Service.AppointmentService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/add")
    public ResponseEntity<Appointment> createAppointment(@RequestParam Long physiotherapistId, @RequestBody  Appointment appointment) throws Exception {
        Appointment createdAppointment = appointmentService.createAppointment(physiotherapistId, appointment);
        return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
    }



    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long appointmentId) throws Exception {
        appointmentService.deleteAppointment(appointmentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> findAppointmentById(@PathVariable Long appointmentId) {
        Appointment appointment = appointmentService.findAppointmentById(appointmentId);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @PutMapping("/{idApp}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long idApp, @RequestBody @Valid Appointment appointment) throws Exception {
        Appointment updatedAppointment = appointmentService.updateAppointment(idApp, appointment);
        if (updatedAppointment != null) {
            return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/existsByPhysiotherapistAndDayAppAndTimeApp")
    public ResponseEntity<Boolean> checkSimilarAppointmentExists(@RequestParam Physiotherapist physiotherapistId, @RequestParam AvailableDay dayApp, @RequestParam AvailableTime timeApp) {
        boolean appointmentExists = appointmentService.existsByPhysiotherapistAndDayAppAndTimeApp(physiotherapistId, dayApp, timeApp);
        return ResponseEntity.ok(appointmentExists);
    }

    // Optional: Add other methods for finding appointments based on specific criteria (e.g., by physiotherapist, date range, etc.)
}
