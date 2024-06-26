package com.example.vitanova.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String firstName;
    private String lastName;
    @Column(unique=true)
    private String email;
    private String password;
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String phonenumber;
    @OneToOne
    private Image image;
    String passwordResetToken;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }





    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Delivery> Deliverys;
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Room> rooms;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<WorkoutSession> WorkoutSessions;
    @ManyToOne(cascade = CascadeType.ALL)
    Restaurant restaurant;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Subscription> Subscriptons;
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<MentorProgram> mentorprograms;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Journal> Journals;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Post> Posts;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<NutrisionistProgram> NutrisionistPrograms;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userprogram")
    private Set<NutrisionistProgram> UserPrograms;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Reclamation> Reclamations;
    @OneToMany(mappedBy = "user")
    private Set<Demande> demandes;
}
