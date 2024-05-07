package com.example.vitanova.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idApp; // Changement de nom de la variable pour respecter les conventions de nommage Java
    @Enumerated(EnumType.STRING)
    private AvailableDay dayApp; // Jour choisi par l'utilisateur
    @Enumerated(EnumType.STRING)
    private AvailableTime timeApp; // Heure choisi par l'utilisateur
    @ManyToOne
    @JsonIgnore
    private Physiotherapist physiotherapist; // Changement de nom de la variable pour respecter les conventions de nommage Java

    public Long getId() {
        return idApp;
    }

    public void setId(Long id) {
        this.idApp = id;
    }
}
