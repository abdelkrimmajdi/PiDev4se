package com.example.vitanova.Configuration;

import com.example.vitanova.Entities.Mail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@AllArgsConstructor
public class EmailService implements EmailSender {

    private JavaMailSender mailSender;


    @Autowired
    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimpleEmail(final Mail mail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("abdelkrimajdi@gmail.com");
        message.setTo(mail.getTo());
        message.setSubject("Réinitialiser le mot de passe");
        message.setText(mail.getContent());
        mailSender.send(message);
    }
    public void sendSimpleEmailFares(final Mail mail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("abdelkrimajdi@gmail.com");
        message.setTo(mail.getTo());
        message.setSubject("Update of your program");
        message.setText(mail.getContent());
        mailSender.send(message);
    }


    public void sendEmail(String toEmail, String email) {

        try { // Création du message MIME
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(mimeMessage, "utf-8");

        // Définition du contenu du message
        helper.setText(email, true);

        // Définition des destinataires
        helper.setTo(toEmail);
        helper.setSubject("Confirm your email");

        // Définition de l'expéditeur
        helper.setFrom("majdi.abdelkrim@esprit.tn");

        // Envoi du message

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new IllegalStateException("failed to send email");
        }
    }
}