package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WorkoutSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdWork;
    private Date Date;
    @Transient
    private int Duration;
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Exercice> exercices;
    public void calculateDuration() {
        this.Duration= exercices.stream().mapToInt(Exercice::getDurationExer).sum();
    }





}
