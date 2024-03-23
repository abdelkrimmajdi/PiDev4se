package com.example.vitanova.Service;

import com.example.vitanova.Entities.Response;

import java.util.List;

public interface ResponseService {
    List<Response> getAllResponses();
    Response getResponseById(Long id);
    Response createResponse(Response response);
    Response updateResponse(Long id, Response response);
    void deleteResponse(Long id);

}