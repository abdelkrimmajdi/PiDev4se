package com.example.vitanova.Service;

<<<<<<< HEAD

import com.example.vitanova.Entities.Reclamation;
import com.example.vitanova.Entities.Response;
import com.example.vitanova.Repositorie.ReclamationRepositorie;
=======
import com.example.vitanova.Entities.Response;
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import com.example.vitanova.Repositorie.ResponseRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResponseServiceImpl implements ResponseService {
    @Autowired
    private ResponseRepositorie responseRepository;
<<<<<<< HEAD
    @Autowired
    private ReclamationRepositorie reclamationRepository;
=======

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
    @Override
    public List<Response> getAllResponses() {
        return responseRepository.findAll();
    }

    @Override
    public Response getResponseById(Long id) {
        Optional<Response> optionalResponse = responseRepository.findById(id);
        return optionalResponse.orElse(null);
    }

    @Override
    public Response createResponse(Response response) {
        return responseRepository.save(response);
    }

    @Override
    public Response updateResponse(Long id, Response response) {
        Optional<Response> optionalResponse = responseRepository.findById(id);
        if (optionalResponse.isPresent()) {
            Response existingResponse = optionalResponse.get();
            existingResponse.setDescriptionRep(response.getDescriptionRep());
            existingResponse.setDateRep(response.getDateRep());
            existingResponse.setReclamation(response.getReclamation());
            return responseRepository.save(existingResponse);
        } else {
            return null;
        }
    }

    @Override
    public void deleteResponse(Long id) {
        responseRepository.deleteById(id);
    }
<<<<<<< HEAD
    @Override
    public Response saveReponseAndAssociateToReclamation(Response reponse, Long idReclamation) {
        Optional<Reclamation> optionalReclamation = reclamationRepository.findById(idReclamation);
        if (optionalReclamation.isPresent()) {
            Reclamation reclamation = optionalReclamation.get();
            reponse.setReclamation(reclamation);
            // Ne pas ajouter la réponse à la liste des réponses de la réclamation ici
            reclamationRepository.save(reclamation); // Pour mettre à jour la relation
            return responseRepository.save(reponse);
        } else {
            // Gérer le cas où l'idReclamation fourni n'existe pas
            // Vous pouvez lever une exception ou le gérer selon la logique de votre application
            return null;
        }
    }
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}
