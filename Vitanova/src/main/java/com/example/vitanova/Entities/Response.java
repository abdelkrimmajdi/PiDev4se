package com.example.vitanova.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdRep;
    private String DescriptionRep;
    private Date DateRep;
    @JsonIgnore
    @ManyToOne
    Reclamation reclamation;


}
