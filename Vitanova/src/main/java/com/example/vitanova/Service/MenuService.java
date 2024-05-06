package com.example.vitanova.Service;

import com.example.vitanova.Entities.Menu;

import java.util.List;
import java.util.Map;

public interface MenuService {
    public Menu create(Menu men, Long programId);
    public void deleteMenu(Long id);
    public List<Menu> getMenuByProgramId(Long ProgramId);
    public byte[] generatePDFForMentorProgramDetails(Long ProgramId);
    public int calculateCaloriesOfFood(String foodName);

   public  Map<String, Integer> calculateCaloriesOfFoods(List<String> foodNames);
}
