package com.example.vitanova.Controller;


import com.example.vitanova.Entities.Response;
import com.example.vitanova.Service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
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
    @PostMapping(path = "/reclamation/{idReclamation}/reponse/save")
    public Response saveReponseAndAssociateToReclamation(@PathVariable Long idReclamation, @RequestBody Response response) {
        return responseService.saveReponseAndAssociateToReclamation(response, idReclamation);
    }
}
