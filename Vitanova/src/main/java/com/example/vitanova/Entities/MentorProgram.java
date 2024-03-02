package com.example.vitanova.Entities;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class MentorProgram {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long IdMentorProg;
    private String name;
    private String Description;
    private String Type;
    private String Objectf;
    private int Duration;
    private String picture;
    @ManyToMany(
            cascade = {CascadeType.ALL}
    )
    private Set<MentorExercice> mentorexercices;

    public Long getIdMentorProg() {
        return this.IdMentorProg;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.Description;
    }

    public String getType() {
        return this.Type;
    }

    public String getObjectf() {
        return this.Objectf;
    }

    public int getDuration() {
        return this.Duration;
    }

    public String getPicture() {
        return this.picture;
    }

    public Set<MentorExercice> getMentorexercices() {
        return this.mentorexercices;
    }

    public void setIdMentorProg(final Long IdMentorProg) {
        this.IdMentorProg = IdMentorProg;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setDescription(final String Description) {
        this.Description = Description;
    }

    public void setType(final String Type) {
        this.Type = Type;
    }

    public void setObjectf(final String Objectf) {
        this.Objectf = Objectf;
    }

    public void setDuration(final int Duration) {
        this.Duration = Duration;
    }

    public void setPicture(final String picture) {
        this.picture = picture;
    }

    public void setMentorexercices(final Set<MentorExercice> mentorexercices) {
        this.mentorexercices = mentorexercices;
    }

    public MentorProgram() {
    }

    public MentorProgram(final Long IdMentorProg, final String name, final String Description, final String Type, final String Objectf, final int Duration, final String picture, final Set<MentorExercice> mentorexercices) {
        this.IdMentorProg = IdMentorProg;
        this.name = name;
        this.Description = Description;
        this.Type = Type;
        this.Objectf = Objectf;
        this.Duration = Duration;
        this.picture = picture;
        this.mentorexercices = mentorexercices;
    }

    public String toString() {
        Long var10000 = this.getIdMentorProg();
        return "MentorProgram(IdMentorProg=" + var10000 + ", name=" + this.getName() + ", Description=" + this.getDescription() + ", Type=" + this.getType() + ", Objectf=" + this.getObjectf() + ", Duration=" + this.getDuration() + ", picture=" + this.getPicture() + ", mentorexercices=" + this.getMentorexercices() + ")";
    }
}
