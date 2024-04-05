package com.example.vitanova.Service;

import com.example.vitanova.Entities.Reclamation;

import java.util.List;

public interface ReclamationService {
    List<Reclamation> getAllReclamations();
    Reclamation getReclamationById(Long id);
    Reclamation createReclamation(Reclamation reclamation);
    Reclamation updateReclamation(Long id, Reclamation reclamation);
    void deleteReclamation(Long id);

}
