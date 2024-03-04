package com.example.vitanova.Dto;

import com.example.vitanova.Entities.User;
import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
    User userDetails;
}