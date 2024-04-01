package com.example.vitanova.Service;


import com.example.vitanova.Configuration.EmailSender;
import com.example.vitanova.Configuration.EmailService;
import com.example.vitanova.Configuration.SmsRequest;
import com.example.vitanova.Dto.JwtAuthenticationResponse;
import com.example.vitanova.Dto.RefreshTokenRequest;
import com.example.vitanova.Dto.SignUpRequest;
import com.example.vitanova.Dto.SigninRequest;
import com.example.vitanova.Entities.*;
import com.example.vitanova.Repositorie.UserRepository;
import com.example.vitanova.Repositorie.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Random;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final EmailService emailService;
    @Autowired
    VerificationTokenRepository VerificationTokenRepo;
    @Autowired
    EmailSender emailSender;
    @Autowired
    Servicess service;


    public User signup(SignUpRequest signUpRequest){
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhonenumber(signUpRequest.getPhonenumber());
        user.setRole((signUpRequest.getRole()));
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setImage(signUpRequest.getImage());
        userRepository.save(user);

        String code =this.generateCode();
        VerificationToken token = new  VerificationToken(code,user);
        VerificationTokenRepo.save(token);
        SmsRequest smsRequest = new SmsRequest(user.getPhonenumber(), token.getToken());

// Appelez la méthode sendSms avec cet objet SmsRequest
        this.service.sendSms(smsRequest);

        return user;
    }
    public String generateCode(){
        Random random = new Random();
        Integer code = 100000 + random.nextInt(900000);
        return code.toString();
    }



    public void sendEmailUser(User u,String code){
        String emailBody="Bonjour"+"<h1>"+u.getFirstName()+"</h1"+
                "Votre code de validation est "+"<h1>"+code+"</h1>";
        emailSender.sendEmail(u.getEmail(),emailBody);
    }
    public JwtAuthenticationResponse signin(SigninRequest signinRequest) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));
        var user = userRepository.findByEmail(signinRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
System.err.println(user.isEnabled());
        if (!user.isEnabled()) {
            throw new IllegalArgumentException("Please confirm your account to proceed.");


        } else {
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);

            if (user.getRole() == Role.USER) {
                User userDetails = (User) user;
                User userDto = convertToUserDto(userDetails);
                jwtAuthenticationResponse.setUserDetails(userDto);
            } else {
                User userDetails = (User) user;
                User userDto = convertToUserDto(userDetails);
                jwtAuthenticationResponse.setUserDetails(userDto);
            }
            return jwtAuthenticationResponse;

        }

    }


    private User convertToUserDto(User user) {
        User dto = new User();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setImage(user.getImage());
        dto.setPhonenumber(user.getPhonenumber());
        dto.setRole(user.getRole());
        return dto;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.ExtractUserName(refreshTokenRequest.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
            var jwt = jwtService.generateToken(user);
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;

        }
        return null;
    }
    public HashMap<String, String> forgetPassword(String email) {
        HashMap message = new HashMap();

        User userexisting = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        UUID token = UUID.randomUUID();
        userexisting.setPasswordResetToken(token.toString());
        userexisting.setId(userexisting.getId());

        Mail mail = new Mail();

        mail.setSubject("Reset Password");
        mail.setTo(userexisting.getEmail());
        mail.setContent("Votre nouveau TOKEN est : " + "http://localhost:4200/resetpassword/"+userexisting.getPasswordResetToken());
        emailService.sendSimpleEmail(mail);
        userRepository.save(userexisting);
        message.put("user","user FOUND and email is Sent");
        return message;
    }


    public HashMap<String,String> resetPassword(@PathVariable String passwordResetToken, String newPassword){
        User userexisting = userRepository.findByPasswordResetToken(passwordResetToken).orElseThrow(() -> new RuntimeException("User not found"));
        HashMap message = new HashMap();
        if (userexisting != null) {
            userexisting.setId(userexisting.getId());
            userexisting.setPassword(new BCryptPasswordEncoder().encode(newPassword));
            userexisting.setPasswordResetToken(null);
            userRepository.save(userexisting);
            message.put("resetpassword","succès");
            return message;
        }else
        {
            message.put("resetpassword","Échoué ");
            return message;
        }
    }
public User  validateToken(String code){
        VerificationToken token =VerificationTokenRepo.findByToken(code);
if(token==null) {
    throw new InvalidTokenException("Invalid Token");

}
User user=token.getUser();
    Calendar calendar=Calendar.getInstance();
    if((token.getExpiryDate().getTime()-calendar.getTime().getTime()) <=0){
        VerificationTokenRepo.delete(token);
        throw new ExpiredTokenException("expired Token");

    }
    user.setEnabled(true);
    userRepository.save(user);
    return  user;
    }

}

