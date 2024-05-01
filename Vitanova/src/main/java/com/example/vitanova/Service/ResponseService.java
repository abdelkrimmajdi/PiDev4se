package com.example.vitanova.Service;

import com.example.vitanova.Entities.Response;

<<<<<<< HEAD

=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import java.util.List;

public interface ResponseService {
    List<Response> getAllResponses();
    Response getResponseById(Long id);
    Response createResponse(Response response);
    Response updateResponse(Long id, Response response);
    void deleteResponse(Long id);

<<<<<<< HEAD
    public Response saveReponseAndAssociateToReclamation(Response reponse, Long idReclamation);

=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}