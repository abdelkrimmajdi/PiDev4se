package com.example.vitanova.Controller;

import com.example.vitanova.Dto.JwtAuthenticationResponse;
import com.example.vitanova.Dto.RefreshTokenRequest;
import com.example.vitanova.Dto.SignUpRequest;
import com.example.vitanova.Dto.SigninRequest;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Service.AuthenticationService;
import com.example.vitanova.Service.AuthenticationServiceImpl;
import com.example.vitanova.Service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @Autowired
    private UserServiceImpl userService;
    @Autowired

    private AuthenticationServiceImpl authenticationServices;
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest){

        return ResponseEntity.ok(authenticationService.signup(signUpRequest));


    }
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse>signin(@RequestBody SigninRequest signinRequest){
        return ResponseEntity.ok(authenticationService.signin( signinRequest));

    }
    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse>referesh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }
    @PostMapping("/forgetpassword")
    public HashMap<String,String> forgetPassword(@RequestParam String email){
        return authenticationServices.forgetPassword(email);
    }

    @PostMapping("/resetPassword/{passwordResetToken}")
    public HashMap<String,String> resetPassword(@PathVariable String passwordResetToken, String newPassword){
        return authenticationServices.resetPassword(passwordResetToken, newPassword);
    }
    @GetMapping("/verifyEmail/{token}")
    public User verifyEmail(@PathVariable("token") String token){
        return authenticationServices.validateToken(token);
    }
}


