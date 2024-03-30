package com.example.vitanova.Dto;

import com.example.vitanova.Entities.Role;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phonenumber;
    private String image;
    private Role role;

}
