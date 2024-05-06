package com.example.vitanova.Service;

import com.example.vitanova.Entities.MentorExercice;
import com.example.vitanova.Entities.Menu;
import com.example.vitanova.Entities.NutrisionistProgram;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.MenuRepository;
import com.example.vitanova.Repositorie.NutrisionisteProgramRepository;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.util.*;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private NutrisionisteProgramRepository nutrisionisteProgramRepository;

    public Menu create(Menu men, Long programId) {
        Optional<NutrisionistProgram> nutrisionistProgram = nutrisionisteProgramRepository.findById(programId);
        if (nutrisionistProgram.isPresent()) {
            NutrisionistProgram menuu = nutrisionistProgram.get();

            men.setNutrisionistprogram(menuu);
            return menuRepository.save(men);
        }
    return  null;

    }
    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }
    public List<Menu> getMenuByProgramId(Long ProgramId) {
        return menuRepository.findByNutrisionistProgramId(ProgramId);
    }
    public byte[] generatePDFForMentorProgramDetails(Long ProgramId) {
        List<Menu> programMenus = menuRepository.findByNutrisionistProgramId(ProgramId);

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();
            document.add(new Paragraph("Détails du programme de mentorat:"));

            // Parcourir tous les menus du programme
            for (Menu menu : programMenus) {
                document.add(new Paragraph("Menu ID: " + menu.getIdMenu()));
                document.add(new Paragraph("Day: " + menu.getDay()));
                document.add(new Paragraph("Repas: " + menu.getRepas()));
                document.add(new Paragraph("Meal: " + menu.getMeal()));
                document.add(new Paragraph("Calories: " + menu.getCalories()));
                document.add(new Paragraph("-------------------------------------"));
            }

            document.close();
            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du PDF pour les détails du programme de mentorat", e);
        }
    }
    private Map<String, Integer> foodCaloriesMap = new HashMap<>();

    // Constructeur où vous pouvez initialiser votre map avec les aliments et leurs calories correspondantes
    public MenuServiceImpl() {
        initializeFoodCaloriesMap();
    }

    private void initializeFoodCaloriesMap() {
        // Ajout des aliments et de leurs calories correspondantes à la map
        foodCaloriesMap.put("pomme", 52);
        foodCaloriesMap.put("banane", 89);
        foodCaloriesMap.put("orange", 62);
        foodCaloriesMap.put("fraise", 32);
        foodCaloriesMap.put("raisin", 69);
        foodCaloriesMap.put("kiwi", 61);
        foodCaloriesMap.put("ananas", 50);
        foodCaloriesMap.put("melon", 34);
        foodCaloriesMap.put("mangue", 60);
        foodCaloriesMap.put("cerise", 50);
        // Légumes
        foodCaloriesMap.put("carotte", 41);
        foodCaloriesMap.put("tomate", 18);
        foodCaloriesMap.put("concombre", 15);
        foodCaloriesMap.put("poivron", 31);
        foodCaloriesMap.put("laitue", 15);
        foodCaloriesMap.put("brocoli", 34);
        foodCaloriesMap.put("épinard", 23);
        foodCaloriesMap.put("courgette", 17);
        foodCaloriesMap.put("aubergine", 25);
        foodCaloriesMap.put("oignon", 40);
        // Produits céréaliers
        foodCaloriesMap.put("pain complet", 250);
        foodCaloriesMap.put("riz brun", 112);
        foodCaloriesMap.put("quinoa", 120);
        foodCaloriesMap.put("orge", 354);
        foodCaloriesMap.put("avoine", 68);
        foodCaloriesMap.put("maïs", 365);
        foodCaloriesMap.put("pâtes complètes", 175);
        foodCaloriesMap.put("farine d'avoine", 68);
        foodCaloriesMap.put("boulgour", 83);
        foodCaloriesMap.put("millet", 189);
        // Protéines
        foodCaloriesMap.put("poulet", 165);
        foodCaloriesMap.put("dinde", 189);
        foodCaloriesMap.put("boeuf maigre", 250);
        foodCaloriesMap.put("saumon", 206);
        foodCaloriesMap.put("tofu", 76);
        foodCaloriesMap.put("haricots noirs", 341);
        foodCaloriesMap.put("lentilles", 230);
        foodCaloriesMap.put("pois chiches", 164);
        // Produits laitiers
        foodCaloriesMap.put("lait", 103);
        foodCaloriesMap.put("yaourt", 61);
        foodCaloriesMap.put("fromage cottage", 98);
        foodCaloriesMap.put("fromage blanc", 72);
        foodCaloriesMap.put("fromage frais", 48);
        foodCaloriesMap.put("kéfir", 57);
        foodCaloriesMap.put("crème fraîche", 340);
        foodCaloriesMap.put("beurre", 717);
        foodCaloriesMap.put("crème glacée", 207);
        // Graisses saines
        foodCaloriesMap.put("avocat", 160);
        foodCaloriesMap.put("huile d'olive", 884);
        foodCaloriesMap.put("noix", 654);
        foodCaloriesMap.put("graines de chia", 486);
        foodCaloriesMap.put("graines de lin", 534);
        foodCaloriesMap.put("beurre d'arachide", 588);
        foodCaloriesMap.put("huile de coco", 862);
        foodCaloriesMap.put("sardines", 208);
        foodCaloriesMap.put("truite", 109);
        // Autres
        foodCaloriesMap.put("oeufs", 155);
        foodCaloriesMap.put("miel", 304);
        foodCaloriesMap.put("sirop d'érable", 260);
        foodCaloriesMap.put("café", 2);
        foodCaloriesMap.put("thé", 1);
        foodCaloriesMap.put("jus de fruit", 45);
        foodCaloriesMap.put("eau", 0);
        // Ajoutez d'autres aliments et leurs calories correspondantes au besoin
    }

    // Méthode pour calculer les calories d'un aliment
    public int calculateCaloriesOfFood(String foodName) {
        // Vérifiez si l'aliment spécifié par l'utilisateur est présent dans la map
        if (foodCaloriesMap.containsKey(foodName)) {
            // Récupérez les calories de l'aliment spécifié
            int calories = foodCaloriesMap.get(foodName);
            return calories;
        } else {
            // Si l'aliment spécifié n'est pas trouvé dans la map, retournez une valeur par défaut ou générez une exception selon vos besoins
            throw new RuntimeException("Informations nutritionnelles non disponibles pour l'aliment spécifié.");
        }
    }

    // Constructor and other methods...

    public Map<String, Integer> calculateCaloriesOfFoods(List<String> foodNames) {
        Map<String, Integer> caloriesMap = new HashMap<>();
        for (String foodName : foodNames) {
            caloriesMap.put(foodName, calculateCaloriesOfFood(foodName));
        }
        return caloriesMap;
    }

}