package com.example.vitanova.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdMess;
    private String senderEmail;
    private String replyMessage;
    private Date time =new Date(System.currentTimeMillis());
    @ManyToOne(fetch = FetchType.EAGER)
    private Room chat;
}
