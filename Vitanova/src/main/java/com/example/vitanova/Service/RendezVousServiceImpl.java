package com.example.vitanova.Service;

import com.example.vitanova.Configuration.EmailSender;
import com.example.vitanova.Configuration.EmailService;
import com.example.vitanova.Entities.Mail;
import com.example.vitanova.Entities.RendezVous;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.RendezVousRepo;
import com.example.vitanova.Repositorie.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RendezVousServiceImpl implements RendezVousService{
    private final EmailService emailService;
    @Autowired
    private RendezVousRepo rendezVousRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    EmailSender emailSender;


    public RendezVousServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public RendezVous saveRendezVous(RendezVous rendezVous, Long userId, Long nutritionistId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        User nutritionist = userRepository.findById(nutritionistId).orElseThrow(() -> new RuntimeException("Nutritionist not found with id: " + nutritionistId));

        rendezVous.setUser(user);
        rendezVous.setNutritionist(nutritionist);
        String mailContent = "Hello " + nutritionist.getFirstName() + nutritionist.getLastName() +  ",\n\n"
                + "You have a new appointment scheduled  "+ rendezVous.getDateTime() +", "+ rendezVous.getTime() +".\n\n"
                + "User's Name: "+ user.getFirstName() + user.getLastName() +  "\n\n"
                + "Best regards,\n"
                + "Your appointment management team";

        Mail mail = new Mail();
        mail.setSubject("New Appointment");
        mail.setTo(nutritionist.getEmail());
        mail.setContent(mailContent);
        emailService.sendemail(mail);
        return rendezVousRepository.save(rendezVous);
    }
    @Override
    public RendezVous getRendezVousById(Long id) {
        return rendezVousRepository.findById(id).orElse(null);
    }

    @Override
    public List<RendezVous> getAllRendezVous() {
        return rendezVousRepository.findAll();
    }

    @Override
    public void deleteRendezVous(Long id) {
        rendezVousRepository.deleteById(id);
    }
    public List<String> getAvailableHoursForDateAndNutritionist(String dateTime, Long nutritionistId) {



        List<RendezVous> rendezVousList = rendezVousRepository.findByDateTimeAndNutritionistId(dateTime, nutritionistId);

        // Créer une liste pour stocker les heures réservées
        List<String> bookedHours = new ArrayList<>();

        // Parcourir la liste des rendez-vous et ajouter les heures réservées à la liste
        for (RendezVous rendezVous : rendezVousList) {
            bookedHours.add(rendezVous.getTime());
        }

        // Créer une liste de toutes les heures possibles pour la journée
        List<String> allHours = getAllHours();

        // Supprimer les heures réservées de la liste de toutes les heures pour obtenir les heures disponibles
        allHours.removeAll(bookedHours);

        // Retourner la liste des heures disponibles
        return allHours;
    }

    // Méthode pour obtenir toutes les heures possibles pour une journée
    private List<String> getAllHours() {
        List<String> allHours = new ArrayList<>();
        // Ajouter toutes les heures possibles à la liste
        allHours.add("09:00");
        allHours.add("09:30");
        allHours.add("10:00");
        allHours.add("10:30");
        allHours.add("11:00");
        allHours.add("11:30");
        allHours.add("12:00");
        allHours.add("12:30");
        allHours.add("14:00");
        allHours.add("14:30");
        allHours.add("15:00");
        allHours.add("15:30");
        allHours.add("16:00");
        return allHours;
    }
    @Override
    public List<RendezVous> getRendezVousByNutritionistId(Long idNutritionist) {
        return rendezVousRepository.findByNutritionistId(idNutritionist);
    }

}
