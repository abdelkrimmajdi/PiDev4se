package com.example.vitanova.Service;

import com.example.vitanova.Entities.Reclamation;
import com.example.vitanova.Repositorie.ReclamationRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReclamationServiceImpl implements ReclamationService{
    @Autowired
    private ReclamationRepositorie reclamationRepository;

    @Override
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    @Override
    public Reclamation getReclamationById(Long id) {
        Optional<Reclamation> optionalReclamation = reclamationRepository.findById(id);
        return optionalReclamation.orElse(null);
    }

    @Override
    public Reclamation createReclamation(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    @Override
    public Reclamation updateReclamation(Long id, Reclamation reclamation) {
        Optional<Reclamation> optionalReclamation = reclamationRepository.findById(id);
        if (optionalReclamation.isPresent()) {
            Reclamation existingReclamation = optionalReclamation.get();
            existingReclamation.setReclamType(reclamation.getReclamType());
            existingReclamation.setReclamDate(reclamation.getReclamDate());
            existingReclamation.setDescriptionReclam(reclamation.getDescriptionReclam());
            existingReclamation.setStateReclam(reclamation.getStateReclam());
            existingReclamation.setResponses(reclamation.getResponses());
            return reclamationRepository.save(existingReclamation);
        } else {
            return null;
        }
    }

    @Override
    public void deleteReclamation(Long id) {
        reclamationRepository.deleteById(id);
    }
}
