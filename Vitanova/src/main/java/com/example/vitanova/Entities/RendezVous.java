package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.Data;
import org.joda.time.DateTime;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class RendezVous {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dateTime;
    private String time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "nutritionist_id")
    private User nutritionist;
}
