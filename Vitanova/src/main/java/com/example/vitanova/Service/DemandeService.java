package com.example.vitanova.Service;


import com.example.vitanova.Entities.Demande;
import com.example.vitanova.Entities.Event;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.DemandeRepository;
import com.example.vitanova.Repositorie.EventRepository;
import com.example.vitanova.Repositorie.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
public class DemandeService {
    @Autowired
    DemandeRepository DR;
    @Autowired
    UserRepository UR;
    @Autowired
    EventRepository ER;
    public void demande(Demande d, Long ide, Long idu) {
        Event e = ER.findById(ide).orElse(null);
        User u = UR.findById(idu).orElse(null);

        // Check if the user has already requested participation in the event
        Demande existingDemande = DR.findByUserAndEvent(u, e);
        if (existingDemande != null) {
            // User has already requested participation, handle accordingly
            // You can throw an exception, return a message, or handle it based on your requirements
            // For example:
            throw new RuntimeException("User has already requested participation in the event");
        }

        // User has not requested participation yet, proceed with creating the request
        d.setEtat("en attente");
        d.setUser(u);
        d.setEvent(e);
        d.setUserName(u.getFirstName());
        d.setEventName(e.getName());
        DR.save(d);
    }


    public void Accept(Long id) {

        Demande d=	DR.findById(id).orElse(null);
        if (d != null && !"accepted".equals(d.getEtat())) {
            // Update the state to "accepted"
            d.setEtat("accepted");

            // Increment nbplace
            d.getEvent().setNbplace(d.getEvent().getNbplace() + 1);

            // Save the changes
            DR.save(d);
        }
    }
    public void Refuser(Long id) {


        Demande d=	DR.findById(id).orElse(null);
        d.setEtat("rejected");
        DR.save(d);

    }

    public void notgoing(Long ide , Long idu) {

        User u =UR.findById(idu).orElse(null);
        Set  <Demande> dd= (Set<Demande>) u.getDemandes();
        for (Demande dem : dd)
        {
            if(dem.getEvent().getId()==ide) {
                DR.delete(dem);

            }

        }
    }
    public Set<Demande> Show (Long id) {


        return UR.findById(id).orElse(null).getDemandes();
    }
    public List<Demande> Show () {
        return   DR.findAll();
    }
}