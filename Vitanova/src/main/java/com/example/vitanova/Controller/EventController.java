package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Event;
import com.example.vitanova.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public void addEvent(@RequestBody Event event) {
        eventService.createEvent(event);
    }

    @PutMapping("/{id}") // Utiliser @PutMapping pour les mises à jour
    public void editEvent(@RequestBody Event event, @PathVariable("id") Long id) {
        eventService.updateEvent(id, event); // Mettre à jour l'événement avec l'ID spécifié
    }

    @GetMapping
    public List<Event> showEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event showEvent(@PathVariable("id") Long id) {
        return eventService.getEventById(id); // Correction de la méthode appelée
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable("id") Long id) {
        eventService.deleteEvent(id); // Correction de la méthode appelée
    }
}
