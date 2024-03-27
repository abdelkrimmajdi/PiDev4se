package com.example.vitanova.Controller;

import com.example.vitanova.Configuration.SmsRequest;
import com.example.vitanova.Service.Servicess;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("api/v1/sms")
public class Controller {

    private final Servicess service;

    @Autowired
    public Controller(Servicess service) {
        this.service = service;
    }

    @PostMapping
    public void sendSms( @RequestBody SmsRequest smsRequest){
        service.sendSms(smsRequest);
    }}
