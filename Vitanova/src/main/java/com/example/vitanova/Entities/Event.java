package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;
@Entity
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String name ;
    private String location ;
    @DateTimeFormat(pattern = "dd-mm-yyyy")
    private Date datedebut;
    @DateTimeFormat(pattern = "dd-mm-yyyy")
    private Date datefin ;
    private int nbplace ;
    private String summary;
    private int nbplacemin ;
    private String image;
    @OneToMany(mappedBy = "event")
    private Set<Demande> demandes;
}
