package com.example.vitanova.Entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MentorExercice {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long IdExercice;
    private String name;
    private String Description;
    private int priority;
    private String picture;
    private int ExeTime;

    public Long getIdExercice() {
        return this.IdExercice;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.Description;
    }

    public int getPriority() {
        return this.priority;
    }

    public String getPicture() {
        return this.picture;
    }

    public int getExeTime() {
        return this.ExeTime;
    }

    public void setIdExercice(final Long IdExercice) {
        this.IdExercice = IdExercice;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setDescription(final String Description) {
        this.Description = Description;
    }

    public void setPriority(final int priority) {
        this.priority = priority;
    }

    public void setPicture(final String picture) {
        this.picture = picture;
    }

    public void setExeTime(final int ExeTime) {
        this.ExeTime = ExeTime;
    }

    public MentorExercice() {
    }

    public MentorExercice(final Long IdExercice, final String name, final String Description, final int priority, final String picture, final int ExeTime) {
        this.IdExercice = IdExercice;
        this.name = name;
        this.Description = Description;
        this.priority = priority;
        this.picture = picture;
        this.ExeTime = ExeTime;
    }

    public String toString() {
        Long var10000 = this.getIdExercice();
        return "MentorExercice(IdExercice=" + var10000 + ", name=" + this.getName() + ", Description=" + this.getDescription() + ", priority=" + this.getPriority() + ", picture=" + this.getPicture() + ", ExeTime=" + this.getExeTime() + ")";
    }
}
