package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String etat;
    @ManyToOne
    private User user;
    @ManyToOne
    private Event event;
    private String UserName;
    private String EventName;
}
