package com.example.vitanova.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Physiotherapist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPhy; // Changement de nom de la variable pour respecter les conventions de nommage Java
    private String phyname;
    private String latitude;
    private String longitude;
    private String ville;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "physiotherapist")
    @JsonIgnore
    private Set<Appointment> appointments; // Changement de nom de la variable pour respecter les conventions de nommage Java
    public Long getId() {
        return idPhy;
    }

    public void setId(Long id) {
        this.idPhy = id;
    }
}
