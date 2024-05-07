package com.example.vitanova.Dto;

import com.example.vitanova.Entities.AvailableDay;
import com.example.vitanova.Entities.AvailableTime;

public class AppointmentDTO {
    private Long id;
    private Long physiotherapistId;
    private AvailableDay dayApp;
    private AvailableTime timeApp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPhysiotherapistId() {
        return physiotherapistId;
    }

    public void setPhysiotherapistId(Long physiotherapistId) {
        this.physiotherapistId = physiotherapistId;
    }

    public AvailableDay getDayApp() {
        return dayApp;
    }

    public void setDayApp(AvailableDay dayApp) {
        this.dayApp = dayApp;
    }

    public AvailableTime getTimeApp() {
        return timeApp;
    }

    public void setTimeApp(AvailableTime timeApp) {
        this.timeApp = timeApp;
    }
}
