package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PersonalObjectif {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdPerOb;
    private String Title;
    private String Description;
    private int priorite;
    @Temporal(TemporalType.DATE)
    private Date EndDate;
    private State statut;

    @ManyToOne
    private Journal journal;
}
