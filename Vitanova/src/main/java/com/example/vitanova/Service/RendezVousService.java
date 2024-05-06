package com.example.vitanova.Service;

import com.example.vitanova.Entities.RendezVous;

import java.util.List;

public interface RendezVousService {

    public RendezVous saveRendezVous(RendezVous rendezVous, Long userId, Long nutritionistId) ;

    RendezVous getRendezVousById(Long id);


    List<RendezVous> getAllRendezVous();


    void deleteRendezVous(Long id);
    public List<String> getAvailableHoursForDateAndNutritionist(String dateTime, Long nutritionistId);
    public List<RendezVous> getRendezVousByNutritionistId(Long idNutritionist);
}
