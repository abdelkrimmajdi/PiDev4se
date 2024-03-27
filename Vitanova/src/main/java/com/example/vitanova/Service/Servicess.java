package com.example.vitanova.Service;

import com.example.vitanova.Configuration.SmsRequest;
import com.example.vitanova.Configuration.SmsSender;
import com.example.vitanova.Configuration.TwilioSmsSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

@org.springframework.stereotype.Service
public class Servicess {
    private final SmsSender smsSender;

    @Autowired
    public Servicess(@Qualifier("twilio") TwilioSmsSender twilioSmsSender){
        this.smsSender = twilioSmsSender;
    }

    public void sendSms(SmsRequest smsRequest){
        smsSender.sendSms(smsRequest);
    }
}