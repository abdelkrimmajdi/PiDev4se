package com.example.vitanova.Service;

import com.example.vitanova.Entities.Event;

import java.util.List;

public interface EventService {
    Event createEvent(Event event);
    Event updateEvent(Long id, Event eventDetails);
    void deleteEvent(Long id);
    Event getEventById(Long id);
    List<Event> getAllEvents();
}
