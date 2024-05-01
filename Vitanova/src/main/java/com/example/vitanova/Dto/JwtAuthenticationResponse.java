package com.example.vitanova.Dto;

import com.example.vitanova.Entities.User;
import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
    User userDetails;
<<<<<<< HEAD
}
=======
}
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
