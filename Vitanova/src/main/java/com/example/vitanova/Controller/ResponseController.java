package com.example.vitanova.Controller;

<<<<<<< HEAD

=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import com.example.vitanova.Entities.Response;
import com.example.vitanova.Service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
<<<<<<< HEAD
@CrossOrigin("*")
=======

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
@RestController
@RequestMapping("/responses")
public class ResponseController {

    @Autowired
    private ResponseService responseService;

    @GetMapping
    public List<Response> getAllResponses() {
        return responseService.getAllResponses();
    }

    @GetMapping("/{id}")
    public Response getResponseById(@PathVariable Long id) {
        return responseService.getResponseById(id);
    }

    @PostMapping
    public Response createResponse(@RequestBody Response response) {
        return responseService.createResponse(response);
    }

    @PutMapping("/{id}")
    public Response updateResponse(@PathVariable Long id, @RequestBody Response response) {
        return responseService.updateResponse(id, response);
    }

    @DeleteMapping("/{id}")
    public void deleteResponse(@PathVariable Long id) {
        responseService.deleteResponse(id);
    }
<<<<<<< HEAD
    @PostMapping(path = "/reclamation/{idReclamation}/reponse/save")
    public Response saveReponseAndAssociateToReclamation(@PathVariable Long idReclamation, @RequestBody Response response) {
        return responseService.saveReponseAndAssociateToReclamation(response, idReclamation);
    }
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}
