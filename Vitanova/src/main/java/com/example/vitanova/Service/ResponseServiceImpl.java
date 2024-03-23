package com.example.vitanova.Service;

import com.example.vitanova.Entities.Response;
import com.example.vitanova.Repositorie.ResponseRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResponseServiceImpl implements ResponseService {
    @Autowired
    private ResponseRepositorie responseRepository;

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
}
