package com.example.vitanova.Service;

import com.example.vitanova.Entities.Demande;
import com.example.vitanova.Entities.Event;
import com.example.vitanova.Repositorie.DemandeRepository;
import com.example.vitanova.Repositorie.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; // Import nécessaire pour @Service
import java.util.List;
import java.util.Optional; // Import nécessaire pour Optional

@Service // Annotation pour indiquer que c'est un service géré par Spring
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private DemandeRepository demandeRepository;

    @Override
    public Event createEvent(Event e) {
        e.setImage(e.getImage().substring(12));

       return eventRepository.save(e);
    }

    @Override
    public Event updateEvent(Long id, Event eventDetails) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            // Mettre à jour les propriétés de l'événement avec les détails fournis
            if (eventDetails.getName() != null) {
                event.setName(eventDetails.getName());
            }
            if (eventDetails.getLocation() != null) {
                event.setLocation(eventDetails.getLocation());
            }
            if (eventDetails.getDatedebut() != null) {
                event.setDatedebut(eventDetails.getDatedebut());
            }
            if (eventDetails.getDatefin() != null) {
                event.setDatefin(eventDetails.getDatefin());
            }
            if (eventDetails.getNbplace() > 0) {
                event.setNbplace(eventDetails.getNbplace());
            }
            if (eventDetails.getSummary() != null) {
                event.setSummary(eventDetails.getSummary());
            }
            if (eventDetails.getNbplacemin() > 0) {
                event.setNbplacemin(eventDetails.getNbplacemin());
            }

            return eventRepository.save(event);
        } else {
            return null; // Gérer si l'événement n'est pas trouvé
        }
    }

            @Override
    public void deleteEvent(Long id) {
        Optional<Event>eventOptional=eventRepository.findById(id);
        Event event=eventOptional.get();

List<Demande> eventList=demandeRepository.findByEvent(event);
for(Demande List :eventList){
demandeRepository.delete(List);}
                eventRepository.deleteById(id);
    }

    @Override
    public Event getEventById(Long id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        return optionalEvent.orElse(null);

    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}
