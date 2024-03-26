package com.example.vitanova.Dto;

import com.example.vitanova.Entities.Role;
import lombok.Data;

@Data
public class SignUpRequest {
    private String firstName;
    private String lastName;

    private String email;

    private String password;
    private String phonenumber;
    private Role role;

}
